import React, { useState } from 'react';
import { Search, Filter, Grid, List, RefreshCw } from 'lucide-react';
import { useChameleoData } from '@/hooks/useChameleoData';
import { ProductCard } from '@/components/ProductCard';

const ChameloCatalog: React.FC = () => {
  const { products, collections, stats, loading, syncData, searchProducts } = useChameleoData();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    search: '',
    collection: '',
    category: '',
    available: 'all',
    priceRange: 'all'
  });

  const handleSearch = () => {
    searchProducts(filters);
  };

  const handleSync = async () => {
    const success = await syncData();
    if (success) {
      alert('Synchronisation réussie !');
    } else {
      alert('Erreur lors de la synchronisation');
    }
  };

  // Convertir les produits Chamelo au format de vos ProductCard existants
  const formatProductForCard = (product: any) => ({
    id: product.id,
    title: product.name,
    name: product.name,
    description: product.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
    price: product.price_min,
    originalPrice: product.compare_at_price,
    image: product.main_image || '/placeholder.jpg',
    images: product.main_image ? [product.main_image] : ['/placeholder.jpg'],
    category: 'classic', // Valeur par défaut pour éviter les erreurs TypeScript
    vendor: product.vendor,
    available: product.available,
    inStock: product.available,
    tags: product.tags,
    slug: product.handle,
    rating: 4.5,
    reviewCount: 0,
    specifications: {}
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🕶️ Catalogue Chamelo</h1>
              <p className="text-gray-600 mt-1">
                {stats.totalProducts} produits • {stats.availableProducts} disponibles
              </p>
            </div>
            <button
              onClick={handleSync}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Synchroniser
            </button>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher des produits..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filtres */}
            <select
              value={filters.collection}
              onChange={(e) => setFilters({...filters, collection: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes collections</option>
              {collections.map((collection: any) => (
                <option key={collection.id} value={collection.handle}>
                  {collection.title} ({collection.products_count})
                </option>
              ))}
            </select>

            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes catégories</option>
              <option value="Smart Sunglasses">Lunettes intelligentes</option>
              <option value="Accessories">Accessoires</option>
              <option value="Hats">Chapeaux</option>
              <option value="Accessories Bundle">Bundles</option>
            </select>

            <select
              value={filters.available}
              onChange={(e) => setFilters({...filters, available: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous</option>
              <option value="true">Disponibles</option>
              <option value="false">En rupture</option>
            </select>

            {/* Boutons */}
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Filter className="w-4 h-4" />
              Filtrer
            </button>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Catalogue */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Chargement...</span>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-4'
          }`}>
            {products.map((product: any) => (
              <ProductCard 
                key={product.id} 
                product={formatProductForCard(product)}
                className={viewMode === 'list' ? 'flex-row' : ''}
              />
            ))}
          </div>
        )}

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 mb-4">
              Aucun produit ne correspond à vos critères de recherche.
            </p>
            <button
              onClick={handleSync}
              className="text-blue-500 hover:text-blue-700"
            >
              Synchroniser le catalogue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChameloCatalog;