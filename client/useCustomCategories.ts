import { useState, useEffect } from 'react';

// Créer un client Supabase spécifique pour nos tables personnalisées
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

// Client Supabase spécifique pour les tables personnalisées
const customSupabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Types pour nos catégories personnalisées
export interface CustomCategory {
  id: string;
  name: string;
  slug: string;
  handle: string;
  description: string | null;
  image_url: string | null;
  parent_category_id: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Interface pour le mappage produit-catégorie
export interface ProductCategoryMapping {
  id: string;
  shopify_product_id: string;
  custom_category_id: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Type pour les produits avec catégories enrichies
export interface EnrichedProduct {
  id: string;
  title: string;
  handle: string;
  categories: CustomCategory[];
  // Autres propriétés du produit...
}

/**
 * Hook pour récupérer et manipuler les catégories personnalisées
 */
export const useCustomCategories = () => {
  const [categories, setCategories] = useState<CustomCategory[]>([]);
  const [mainCategories, setMainCategories] = useState<CustomCategory[]>([]);
  const [subCategories, setSubCategories] = useState<{[key: string]: CustomCategory[]}>({});
  const [mappings, setMappings] = useState<ProductCategoryMapping[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Récupérer toutes les catégories personnalisées
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await customSupabase
        .from('custom_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      // Toutes les catégories
      setCategories(data || []);
      
      // Catégories principales (sans parent)
      const main = data?.filter(cat => !cat.parent_category_id) || [];
      setMainCategories(main);
      
      // Sous-catégories organisées par parent
      const subs: {[key: string]: CustomCategory[]} = {};
      data?.forEach(cat => {
        if (cat.parent_category_id) {
          if (!subs[cat.parent_category_id]) {
            subs[cat.parent_category_id] = [];
          }
          subs[cat.parent_category_id].push(cat);
        }
      });
      setSubCategories(subs);
      
    } catch (err) {
      console.error('Error fetching custom categories:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les mappages produit-catégorie
  const fetchMappings = async () => {
    try {
      const { data, error } = await customSupabase
        .from('product_category_mapping')
        .select('*');

      if (error) throw error;
      setMappings(data || []);
    } catch (err) {
      console.error('Error fetching product-category mappings:', err);
      setError(err as Error);
    }
  };

  // Obtenir les sous-catégories d'une catégorie parent par son handle
  const getSubCategoriesByParentHandle = (parentHandle: string): CustomCategory[] => {
    const parent = categories.find(cat => cat.handle === parentHandle);
    if (!parent) return [];
    
    return subCategories[parent.id] || [];
  };

  // Obtenir les catégories par produit Shopify ID
  const getCategoriesByProductId = (productId: string): CustomCategory[] => {
    const productMappings = mappings.filter(m => m.shopify_product_id === productId);
    if (!productMappings.length) return [];
    
    return categories.filter(cat => 
      productMappings.some(mapping => mapping.custom_category_id === cat.id)
    );
  };

  // Obtenir les produits par catégorie (nécessite de fusionner avec les données de produits Shopify)
  const getProductsByCategory = (categoryId: string, shopifyProducts: any[]): any[] => {
    const categoryMappings = mappings.filter(m => m.custom_category_id === categoryId);
    if (!categoryMappings.length) return [];
    
    return shopifyProducts.filter(product => 
      categoryMappings.some(mapping => mapping.shopify_product_id === product.id)
    ).sort((a, b) => {
      // Trier par ordre d'affichage si disponible
      const mappingA = categoryMappings.find(m => m.shopify_product_id === a.id);
      const mappingB = categoryMappings.find(m => m.shopify_product_id === b.id);
      
      if (!mappingA || !mappingB) return 0;
      return mappingA.display_order - mappingB.display_order;
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchMappings();
  }, []);

  return {
    categories,
    mainCategories,
    subCategories,
    mappings,
    loading,
    error,
    getSubCategoriesByParentHandle,
    getCategoriesByProductId,
    getProductsByCategory,
    refresh: () => {
      fetchCategories();
      fetchMappings();
    }
  };
};

export default useCustomCategories;
