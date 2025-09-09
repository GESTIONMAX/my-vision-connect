import React, { useState, useEffect } from 'react';
import { useChameleoProducts } from '@/hooks/useChameleoProducts';
import { ChameleoFilters } from '@/types/chameleo';

interface ChameleoProductListProps {
  initialFilters?: ChameleoFilters;
  title?: string;
  showFilters?: boolean;
  limit?: number;
}

export const ChameleoProductList: React.FC<ChameleoProductListProps> = ({
  initialFilters = {},
  title = 'Produits Chamelo',
  showFilters = true,
  limit = 0
}) => {
  const [filters, setFilters] = useState<ChameleoFilters>(initialFilters);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(initialFilters.collection || '');
  
  const {
    products,
    collections,
    isLoading,
    error,
    stats,
    fetchProducts,
    syncCatalog
  } = useChameleoProducts(filters, true, true);

  // Filtrer les produits si une limite est spécifiée
  const displayProducts = limit > 0 ? products.slice(0, limit) : products;

  // Appliquer les nouveaux filtres
  const applyFilters = () => {
    const newFilters = { ...filters };
    
    if (searchInput.trim()) {
      newFilters.search = searchInput;
    } else {
      delete newFilters.search;
    }
    
    if (selectedCollection) {
      newFilters.collection = selectedCollection;
    } else {
      delete newFilters.collection;
    }
    
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  // Appliquer les filtres lorsqu'ils changent
  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  // Gérer la soumission du formulaire de recherche
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Gérer le changement de collection
  const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollection(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => syncCatalog()}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Synchronisation...' : 'Synchroniser'}
          </button>
          {stats.lastSync && (
            <p className="text-sm text-gray-500">
              Dernière sync: {new Date(stats.lastSync).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="search" className="block mb-1 font-medium">Recherche</label>
              <input
                type="text"
                id="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Rechercher par nom, description..."
              />
            </div>
            <div>
              <label htmlFor="collection" className="block mb-1 font-medium">Collection</label>
              <select
                id="collection"
                value={selectedCollection}
                onChange={handleCollectionChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Toutes les collections</option>
                <option value="sport">Sport</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="prismatic">Prismatic</option>
                <option value="accessories">Accessoires</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.handle}>
                    {collection.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="self-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
              >
                Appliquer les filtres
              </button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-800 rounded-md">
          Erreur: {error.message}
        </div>
      )}

      <div className="mb-4">
        <p>
          <span className="font-medium">Total:</span> {stats.totalProducts} produits |{' '}
          <span className="font-medium">Disponibles:</span> {stats.availableProducts} produits |{' '}
          <span className="font-medium">Collections:</span> {stats.totalCollections}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                {product.main_image && (
                  <div className="aspect-square bg-gray-100 mb-4 rounded overflow-hidden">
                    <img
                      src={product.main_image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Erreur de chargement image:', product.main_image);
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://via.placeholder.com/400?text=Image+non+disponible';
                      }}
                    />
                  </div>
                )}
                
                <h2 className="text-lg font-bold truncate">{product.name}</h2>
                
                <div className="mt-2">
                  {product.price_min === product.price_max ? (
                    <p className="font-medium">{product.price_min} €</p>
                  ) : (
                    <p className="font-medium">{product.price_min} € - {product.price_max} €</p>
                  )}
                  
                  {product.compare_at_price && product.compare_at_price > product.price_min && (
                    <p className="text-gray-500 line-through">{product.compare_at_price} €</p>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mt-1">{product.vendor}</p>
                
                <p className="mt-2 text-sm">
                  {product.available ? (
                    <span className="text-green-600">✓ En stock</span>
                  ) : (
                    <span className="text-red-600">✗ Indisponible</span>
                  )}
                </p>
                
                <div className="mt-3">
                  <button 
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    onClick={() => window.open(`https://chamelo.com/products/${product.handle}`, '_blank')}
                  >
                    Voir le produit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-8 bg-gray-50 rounded-lg">
              Aucun produit ne correspond aux critères de recherche.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChameleoProductList;
