import { useState, useEffect, useCallback } from 'react';
import { chameleoApi, Product, Collection } from '@/services/chameleoApi';
import { ChameleoFilters } from '@/types/chameleo';

interface UseChameleoProductsState {
  products: Product[];
  collections: Collection[];
  isLoading: boolean;
  error: Error | null;
  stats: {
    totalProducts: number;
    availableProducts: number;
    totalCollections: number;
    lastSync?: string;
    lastSyncStatus: string;
  };
}

interface UseChameleoProductsReturn extends UseChameleoProductsState {
  fetchProducts: (filters?: ChameleoFilters) => void;
  syncCatalog: () => Promise<void>;
  getProductByHandle: (handle: string) => Product | undefined;
  getCollectionByHandle: (handle: string) => Collection | undefined;
}

/**
 * Hook personnalisé pour interagir avec l'API Chamelo (Shopify)
 * @param initialFilters - Filtres initiaux à appliquer
 * @param autoSync - Si true, synchronise automatiquement le catalogue au montage si nécessaire
 * @param autoFetch - Si true, récupère automatiquement les produits au montage
 */
export const useChameleoProducts = (
  initialFilters: ChameleoFilters = {},
  autoSync: boolean = true,
  autoFetch: boolean = true
): UseChameleoProductsReturn => {
  const [state, setState] = useState<UseChameleoProductsState>({
    products: [],
    collections: [],
    isLoading: false,
    error: null,
    stats: {
      totalProducts: 0,
      availableProducts: 0,
      totalCollections: 0,
      lastSyncStatus: 'pending'
    }
  });

  /**
   * Récupère les produits avec les filtres spécifiés
   */
  const fetchProducts = useCallback((filters: ChameleoFilters = initialFilters) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Utiliser les données du localStorage via chameleoApi
      const { products, total } = chameleoApi.getProducts(filters);
      const collections = chameleoApi.getCollections();
      const stats = chameleoApi.getStats();
      
      setState({
        products,
        collections,
        isLoading: false,
        error: null,
        stats
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error : new Error('Erreur inconnue')
      }));
    }
  }, [initialFilters]);

  /**
   * Synchronise le catalogue complet depuis l'API Chamelo/Shopify
   */
  const syncCatalog = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { products, collections } = await chameleoApi.syncCatalog();
      const stats = chameleoApi.getStats();
      
      setState({
        products,
        collections,
        isLoading: false,
        error: null,
        stats
      });
      
      return;
    } catch (error) {
      console.error('Erreur lors de la synchronisation du catalogue:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error : new Error('Erreur inconnue')
      }));
      
      throw error;
    }
  }, []);

  /**
   * Récupère un produit spécifique par son handle (slug)
   */
  const getProductByHandle = useCallback((handle: string): Product | undefined => {
    return state.products.find(product => product.handle === handle);
  }, [state.products]);

  /**
   * Récupère une collection spécifique par son handle (slug)
   */
  const getCollectionByHandle = useCallback((handle: string): Collection | undefined => {
    return state.collections.find(collection => collection.handle === handle);
  }, [state.collections]);

  // Vérifier si une synchronisation est nécessaire
  const shouldSync = useCallback(() => {
    const lastSync = localStorage.getItem('chamelo_last_sync');
    if (!lastSync) return true;
    
    // Vérifier si la dernière synchronisation date de plus de 24 heures
    const lastSyncDate = new Date(lastSync);
    const now = new Date();
    const diffHours = (now.getTime() - lastSyncDate.getTime()) / (1000 * 60 * 60);
    
    return diffHours > 24;
  }, []);

  // Effet initial pour charger les données
  useEffect(() => {
    const initialize = async () => {
      const needsSync = shouldSync();
      
      if (autoSync && needsSync) {
        try {
          await syncCatalog();
        } catch (error) {
          console.error('Erreur de synchronisation initiale:', error);
          // En cas d'échec de synchronisation, essayer de charger les données locales
          if (autoFetch) {
            fetchProducts(initialFilters);
          }
        }
      } else if (autoFetch) {
        fetchProducts(initialFilters);
      }
    };

    initialize();
  }, [autoSync, autoFetch, fetchProducts, initialFilters, syncCatalog, shouldSync]);

  return {
    ...state,
    fetchProducts,
    syncCatalog,
    getProductByHandle,
    getCollectionByHandle
  };
};

export default useChameleoProducts;
