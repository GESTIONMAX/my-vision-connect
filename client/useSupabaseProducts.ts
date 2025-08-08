import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SupabaseProduct {
  uuid: string;
  id: string;
  title: string;
  category: string;
  price: number;
  available: string;
  sku: string;
  source: string;
  description_length: number;
  vendor: string;
  product_type: string;
  handle: string;
  url: string;
  lens_technology: string;
  images_count: number;
  main_image: string;
  image_url?: string; // Ajouté pour compatibilité avec Header.tsx
  quality_score: number;
  ecommerce_readiness: string;
  collection: string;
  sub_collection: string;
  is_popular: boolean;
  is_new: boolean;
}

export interface ProductCollection {
  name: string;
  slug: string;
  products: SupabaseProduct[];
  subCollections?: {
    name: string;
    slug: string;
    products: SupabaseProduct[];
    image?: string;
  }[];
}

export const useSupabaseProducts = () => {
  const [products, setProducts] = useState<SupabaseProduct[]>([]);
  const [collections, setCollections] = useState<ProductCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Méthode plus directe pour récupérer les données
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
      const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
      
      // Vérifier si les variables sont définies
      if (!SUPABASE_URL || !SUPABASE_KEY) {
        throw new Error('Variables d\'environnement Supabase manquantes');
      }

      const response = await fetch(`${SUPABASE_URL}/rest/v1/chamelo_products?select=*`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('Produits récupérés de Supabase (via fetch):', data?.length || 0);
      
      if (data && Array.isArray(data)) {
        // Stocker les données brutes
        setProducts(data as SupabaseProduct[]);
        
        // Organiser les produits par collection principale
        const collectionMap: Record<string, ProductCollection> = {};
        
        // Définir les collections principales (par défaut, en attendant de les dynamiser)
        const mainCollections = ['sport', 'lifestyle', 'prismatic'];
        
        mainCollections.forEach(coll => {
          collectionMap[coll] = {
            name: coll.charAt(0).toUpperCase() + coll.slice(1),
            slug: coll,
            products: [],
            subCollections: []
          };
        });
        
        // Ajouter les produits aux collections
        data.forEach((product: SupabaseProduct) => {
          // Déduire la collection principale à partir de la catégorie
          let mainCollection = 'lifestyle'; // par défaut
          
          if (product.category?.toLowerCase().includes('sport')) {
            mainCollection = 'sport';
          } else if (product.category?.toLowerCase().includes('premium')) {
            mainCollection = 'prismatic';
          }
          
          // S'assurer que la collection existe
          if (!collectionMap[mainCollection]) {
            collectionMap[mainCollection] = {
              name: mainCollection.charAt(0).toUpperCase() + mainCollection.slice(1),
              slug: mainCollection,
              products: [],
              subCollections: []
            };
          }
          
          // Ajouter le produit à sa collection principale
          collectionMap[mainCollection].products.push(product);
          
          // Gérer la sous-collection (product_type ou title)
          const subCollectionName = product.product_type || product.title?.split(' ')[0];
          
          if (subCollectionName) {
            // Vérifier si la sous-collection existe déjà
            let subCollection = collectionMap[mainCollection].subCollections?.find(
              sc => sc.name.toLowerCase() === subCollectionName.toLowerCase()
            );
            
            // Si elle n'existe pas, la créer
            if (!subCollection) {
              subCollection = {
                name: subCollectionName,
                slug: subCollectionName.toLowerCase().replace(/\s+/g, '-'),
                products: [],
                // Générer une image par défaut basée sur le nom de la sous-collection
                image: `/images/products/${subCollectionName.toLowerCase().replace(/\s+/g, '-')}.jpg`
              };
              collectionMap[mainCollection].subCollections?.push(subCollection);
            }
            
            // Ajouter le produit à sa sous-collection
            subCollection.products.push(product);
          }
        });
        
        // Convertir la map en tableau
        setCollections(Object.values(collectionMap));
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des produits:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }

    // Fonction pour réinitialiser le cache des produits
    const refetch = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Utiliser la même approche fetch que dans fetchProducts
        const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
        const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
        
        if (!SUPABASE_URL || !SUPABASE_KEY) {
          throw new Error('Variables d\'environnement Supabase manquantes');
        }

        const response = await fetch(`${SUPABASE_URL}/rest/v1/chamelo_products?select=*`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data) {
          setProducts(data as SupabaseProduct[]);
          // Reconstruire les collections...
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };
  };

  const searchProducts = async (query: string) => {
    try {
      setLoading(true);
      const { data, error: searchError } = await supabase
        .from('chamelo_products')
        .select('*')
        .ilike('title', `%${query}%`);

      if (searchError) throw new Error(searchError.message);
      
      if (data) {
        setProducts(data as unknown as SupabaseProduct[]);
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError(err instanceof Error ? err.message : 'Erreur de recherche');
    } finally {
      setLoading(false);
    }
  };

  const getCollectionProducts = async (collection: string, subCollection?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('chamelo_products')
        .select('*');
        
      // Filtrer par collection principale (simplifier pour l'instant)
      if (collection === 'sport') {
        query = query.ilike('category', '%sport%').or('product_type.ilike.%Shield%,product_type.ilike.%Pro%');
      } else if (collection === 'lifestyle') {
        query = query.ilike('category', '%lifestyle%').or('product_type.ilike.%Veil%,product_type.ilike.%Dragon%');
      } else if (collection === 'prismatic') {
        query = query.ilike('category', '%premium%').or('product_type.ilike.%Euphoria%,product_type.ilike.%Aura%');
      }
      
      // Filtrer par sous-collection si spécifiée
      if (subCollection) {
        query = query.or(`product_type.ilike.%${subCollection}%,title.ilike.%${subCollection}%`);
      }
      
      const { data, error: filterError } = await query;

      if (filterError) throw new Error(filterError.message);
      
      if (data) {
        return data as unknown as SupabaseProduct[];
      }
      return [];
    } catch (err) {
      console.error('Erreur lors du filtrage:', err);
      setError(err instanceof Error ? err.message : 'Erreur de filtrage');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    collections,
    loading,
    error,
    fetchProducts,
    searchProducts,
    getCollectionProducts
  };
};

export default useSupabaseProducts;
