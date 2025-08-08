import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/hooks/useProducts';
import { Database } from '@/types/supabase';

// Typage pour les tables Supabase
type BestsellerRow = Database['public']['Tables']['bestsellers']['Row'];
type BestsellerInsert = Database['public']['Tables']['bestsellers']['Insert'];

// Type pour la vue bestsellers qui inclut les détails du produit
type BestsellerProductView = Database['public']['Views']['view_bestsellers']['Row'];

// Type pour les produits bestsellers à utiliser dans l'application
interface BestsellerProduct extends Product {
  bestseller_id: string;
  rank: number;
  featured: boolean;
}

/**
 * Hook pour récupérer les meilleures ventes depuis Supabase
 * @returns Les bestsellers, le statut de chargement et les erreurs éventuelles
 */
export const useBestsellers = () => {
  return useQuery({
    queryKey: ['bestsellers'],
    queryFn: async () => {
      // On type explicitement la table comme étant une vue
      const { data, error } = await supabase
        .from('view_bestsellers')
        .select('*')
        .order('rank') as { data: BestsellerProductView[] | null, error: any };
      
      if (error) {
        throw error;
      }
      
      return (data || []) as unknown as BestsellerProduct[];
    }
  });
};

/**
 * Fonction pour vérifier si un produit est un bestseller
 * @param productId ID du produit à vérifier
 * @returns true si le produit est un bestseller
 */
export const checkIsBestseller = async (productId: string): Promise<boolean> => {
  // On type explicitement la table
  const { data, error } = await supabase
    .from('bestsellers')
    .select('id')
    .eq('product_id', productId)
    .single() as { data: BestsellerRow | null, error: any };
  
  if (error) {
    console.error('Erreur lors de la vérification du statut bestseller:', error);
    return false;
  }
  
  return !!data;
};

/**
 * Fonction pour ajouter un produit aux bestsellers
 * @param productId ID du produit à ajouter
 * @param rank Position dans le classement (1, 2, 3...)
 * @returns Le résultat de l'opération
 */
export const addProductToBestsellers = async (productId: string, rank: number) => {
  const newBestseller: BestsellerInsert = {
    product_id: productId,
    rank
  };
  
  return supabase
    .from('bestsellers')
    .insert(newBestseller) as { data: BestsellerRow | null, error: any };
};

/**
 * Fonction pour retirer un produit des bestsellers
 * @param productId ID du produit à retirer
 * @returns Le résultat de l'opération
 */
export const removeProductFromBestsellers = async (productId: string) => {
  return supabase
    .from('bestsellers')
    .delete()
    .eq('product_id', productId) as { data: BestsellerRow | null, error: any };
};
