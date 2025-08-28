import React, { useState, useEffect } from 'react';
import { RefreshCw, Package, ShoppingCart, Eye, Search, Filter, Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { chameleoApi, Product, Collection, Stats } from '../services/chameleoApi';

export default function ChameloDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    availableProducts: 0,
    totalCollections: 0,
    lastSyncStatus: 'never'
  });
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    collection: '',
    available: 'all'
  });

  // Charger les données au démarrage
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Charger données dashboard
  const loadDashboardData = () => {
    setLoading(true);
    try {
      const statsData = chameleoApi.getStats();
      const { products: productsData } = chameleoApi.getProducts(filters);
      const collectionsData = chameleoApi.getCollections();

      setStats(statsData);
      setProducts(productsData.slice(0, 12)); // Limiter à 12 pour l'affichage
      setCollections(collectionsData);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  // Démarrer synchronisation
  const startSync = async () => {
    setSyncing(true);
    try {
      const result = await chameleoApi.syncCatalog();
      alert(`Synchronisation réussie :\n${result.products.length} produits\n${result.collections.length} collections`);
      loadDashboardData(); // Recharger les données
    } catch (error) {
      alert('Erreur lors de la synchronisation');
      console.error(error);
    } finally {
      setSyncing(false);
    }
  };

  // Rechercher produits
  const searchProducts = () => {
    setLoading(true);
    try {
      const { products: filteredProducts } = chameleoApi.getProducts(filters);
      setProducts(filteredProducts.slice(0, 12));
    } catch (error) {
      console.error('Erreur recherche:', error);
    } finally {
      setLoading(false);
    }
  };

  // Formatage prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Formatage date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🕶️ Chamelo Dashboard</h1>
              <p className="text-gray-600 mt-1">Gestion du catalogue Chamelo</p>
            </div>
            
            <button
              onClick={startSync}
              disabled={syncing}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                syncing 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Synchronisation...' : 'Synchroniser'}
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Produits</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
              </div>
              <Package className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Disponibles</p>
                <p className="text-3xl font-bold text-green-600">{stats.availableProducts}</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Collections</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalCollections}</p>
              </div>
              <Filter className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dernière Sync</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(stats.lastSync)}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-orange-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📦 Produits ({stats.totalProducts})
              </button>
              <button
                onClick={() => setActiveTab('collections')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'collections'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📂 Collections ({stats.totalCollections})
              </button>
            </nav>
          </div>
        </div>

        {/* Filtres et Recherche */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher des produits..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Toutes catégories</option>
                <option value="Hats">Chapeaux</option>
                <option value="Smart Sunglasses">Lunettes intelligentes</option>
                <option value="Accessories">Accessoires</option>
                <option value="Accessories Bundle">Bundles</option>
              </select>
              
              <select
                value={filters.available}
                onChange={(e) => setFilters({...filters, available: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous</option>
                <option value="true">Disponibles</option>
                <option value="false">Rupture</option>
              </select>
              
              <button
                onClick={searchProducts}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              >
                <Filter className="w-4 h-4" />
                Filtrer
              </button>
            </div>
          </div>
        )}

        {/* Liste des Produits */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Catalogue Produits</h2>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Chargement...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Image produit */}
                    <div className="aspect-square bg-gray-100 relative">
                      {product.main_image ? (
                        <img
                          src={product.main_image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Badge disponibilité */}
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                        product.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.available ? 'Disponible' : 'Rupture'}
                      </div>
                    </div>
                    
                    {/* Infos produit */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{product.product_type}</span>
                        <span className="text-sm text-gray-500">{product.vendor}</span>
                      </div>
                      
                      {/* Prix */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {product.price_min === product.price_max ? (
                            <span className="text-lg font-bold text-green-600">
                              {formatPrice(product.price_min)}
                            </span>
                          ) : (
                            <span className="text-lg font-bold text-green-600">
                              {formatPrice(product.price_min)} - {formatPrice(product.price_max)}
                            </span>
                          )}
                          
                          {product.compare_at_price && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.compare_at_price)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Tags */}
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {product.tags.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{product.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Actions */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {product.variants?.length || 0} variante(s)
                        </span>
                        
                        <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm">
                          <Eye className="w-4 h-4" />
                          Voir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {products.length === 0 && !loading && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucun produit trouvé</p>
                <button
                  onClick={startSync}
                  className="mt-4 text-blue-500 hover:text-blue-700"
                >
                  Lancer une synchronisation
                </button>
              </div>
            )}
          </div>
        )}

        {/* Liste des Collections */}
        {activeTab === 'collections' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Collections Chamelo</h2>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Chargement...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {collections.map((collection) => (
                  <div key={collection.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Image collection */}
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 relative">
                      {collection.image_url ? (
                        <img
                          src={collection.image_url}
                          alt={collection.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Filter className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Badge nombre de produits */}
                      <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {collection.products_count} produits
                      </div>
                    </div>
                    
                    {/* Infos collection */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                        {collection.title}
                      </h3>
                      
                      {collection.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {collection.description.replace(/<[^>]*>/g, '')}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {formatDate(collection.updated_at)}
                          </span>
                        </div>
                        
                        <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm">
                          <Eye className="w-4 h-4" />
                          Explorer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {collections.length === 0 && !loading && (
              <div className="text-center py-12">
                <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucune collection trouvée</p>
                <button
                  onClick={startSync}
                  className="mt-4 text-blue-500 hover:text-blue-700"
                >
                  Lancer une synchronisation
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
