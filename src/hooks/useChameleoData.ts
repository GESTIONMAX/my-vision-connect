import { useState, useEffect } from 'react';
import { chameleoApi, Product, Collection, Stats } from '@/services/chameleoApi';

export const useChameleoData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    availableProducts: 0,
    totalCollections: 0,
    lastSyncStatus: 'never'
  });
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    try {
      const statsData = chameleoApi.getStats();
      const { products: productsData } = chameleoApi.getProducts();
      const collectionsData = chameleoApi.getCollections();

      setStats(statsData);
      setProducts(productsData);
      setCollections(collectionsData);
    } catch (error) {
      console.error('Erreur chargement Chamelo:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncData = async () => {
    setLoading(true);
    try {
      await chameleoApi.syncCatalog();
      loadData(); // Recharger après sync
      return true;
    } catch (error) {
      console.error('Erreur sync Chamelo:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = (filters: any) => {
    const { products: filteredProducts } = chameleoApi.getProducts(filters);
    setProducts(filteredProducts);
  };

  // Récupère les produits d'une collection spécifique
  const getCollectionProducts = async (collectionId: string) => {
    try {
      // Utiliser l'API pour récupérer les produits de la collection par ID
      const { products: collectionProducts } = chameleoApi.getProducts({
        collection: collectionId
      });
      return collectionProducts;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits de la collection:', error);
      return [];
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    products,
    collections,
    stats,
    loading,
    loadData,
    syncData,
    searchProducts,
    getCollectionProducts
  };
};

export default useChameleoData;
