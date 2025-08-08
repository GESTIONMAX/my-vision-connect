import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Grid, List, RefreshCw, Sliders, X, ChevronDown, ChevronUp, Menu } from 'lucide-react';
import { useChameleoData } from '@/hooks/useChameleoData';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/hooks/useProducts';
import toast from 'react-hot-toast';

const ChameloCatalog: React.FC = () => {
  const { products, collections, stats, loading: apiLoading, syncData } = useChameleoData();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeSection, setActiveSection] = useState<'collections' | 'bestsellers' | 'new' | 'accessories'>('collections');
  const [filters, setFilters] = useState({
    search: '',
    collection: '',
    subCollection: '', // Pour filtrer par sous-gamme (Shield, Music Shield, etc.)
    category: '',
    available: 'all',
    priceRange: 'all',
    // Nouveaux filtres avancés
    lensTechnology: '',
    hasAudio: '',
    uvProtection: '',
    priceMin: '',
    priceMax: '',
    // Filtres pour les sections spéciales
    is_popular: '',
    is_new: ''
  });
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  // Regroupement des produits par catégorie principale
  const productsByCategory = products.reduce((acc: any, product: any) => {
    const category = product.category || 'Autre';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  // Définition des 3 collections principales
  const mainCollections = ['sport', 'lifestyle', 'prismatic'];

  // Définition des sous-gammes pour chaque collection principale
  const subCollections = {
    sport: [
      { name: 'Shield', image: '/placeholder.jpg' },
      { name: 'Music Shield', image: '/placeholder.jpg' },
    ],
    lifestyle: [
      { name: 'Veil', image: '/placeholder.jpg' },
      { name: 'Dragon', image: '/placeholder.jpg' },
    ],
    prismatic: [
      { name: 'Euphoria', image: '/placeholder.jpg' },
      { name: 'Aura', image: '/placeholder.jpg' },
    ]
  };

  // Mappage des catégories vers les collections principales
  const mapCategoryToCollection = (category: string): string => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('sport') || lowerCategory.includes('performance') || 
        lowerCategory.includes('shield')) {
      return 'sport';
    } else if (lowerCategory.includes('prismatic') || lowerCategory.includes('color-changing') ||
               lowerCategory.includes('euphoria') || lowerCategory.includes('aura')) {
      return 'prismatic';
    } else {
      return 'lifestyle';
    }
  };
  
  // Mappage des produits vers les sous-gammes
  const mapProductToSubCollection = (product: any): string => {
    const name = (product.name || product.title || '').toLowerCase();
    const description = (product.description || '').toLowerCase();
    
    // Sport sub-collections
    if (name.includes('shield') || description.includes('shield')) {
      return name.includes('music') ? 'Music Shield' : 'Shield';
    }
    
    // Lifestyle sub-collections
    if (name.includes('veil') || description.includes('veil')) {
      return 'Veil';
    }
    if (name.includes('dragon') || description.includes('dragon')) {
      return 'Dragon';
    }
    
    // Prismatic sub-collections
    if (name.includes('euphoria') || description.includes('euphoria')) {
      return 'Euphoria';
    }
    if (name.includes('aura') || description.includes('aura')) {
      return 'Aura';
    }
    
    // Default
    return 'Other';
  };

  // Regroupement des produits par collection principale
  const productsByCollection = products.reduce((acc: any, product: any) => {
    const productCategory = product.category || '';
    const collection = mapCategoryToCollection(productCategory);

    if (!acc[collection]) {
      acc[collection] = [];
    }
    acc[collection].push({
      ...product,
      mainCollection: collection // Ajout de la collection principale au produit
    });
    return acc;
  }, {});

  // Regroupement des produits par gamme à l'intérieur de chaque collection
  const productsByCollectionAndSeries = mainCollections.reduce((acc: any, collection: string) => {
    acc[collection] = {};

    // Regrouper les produits de cette collection par gamme (titre du produit sans le sous-titre)
    if (productsByCollection[collection]) {
      productsByCollection[collection].forEach((product: any) => {
        // Extraction de la gamme (nom principal du produit sans les détails)
        const productTitle = product.title || product.name || '';
        const seriesName = productTitle.split(' ')[0] || 'Autres'; // Premier mot comme nom de gamme

        if (!acc[collection][seriesName]) {
          acc[collection][seriesName] = [];
        }

        acc[collection][seriesName].push(product);
      });
    }

    return acc;
  }, {});

  // Extraction des attributs uniques pour les filtres
  const lensTypes = [...new Set(products
    .filter((p: any) => p.lens_technology)
    .map((p: any) => Array.isArray(p.lens_technology) ? p.lens_technology : [p.lens_technology])
    .flat())
  ].filter(Boolean);

  const handleSearch = () => {
    console.log('Recherche avec filtres avancés:', filters);
    
    setLocalLoading(true);
    
    // Création d'un objet de filtres étendu pour le filtrage avancé
    const extendedFilters = {
      ...filters,
      // Conversion des valeurs string en booléens pour les filtres booléens
      hasAudio: filters.hasAudio ? filters.hasAudio === 'true' : undefined,
      uvProtection: filters.uvProtection ? filters.uvProtection === 'true' : undefined,
      // Conversion des prix en nombres
      priceMin: filters.priceMin ? parseFloat(filters.priceMin) : undefined,
      priceMax: filters.priceMax ? parseFloat(filters.priceMax) : undefined,
      // Assurer que collection fonctionne correctement
      collection: filters.collection || ''
    };
    
    // Filtrage des produits
    const filtered = products.filter((product: any) => {
      // Filtre par recherche textuelle
      if (extendedFilters.search && !product.name?.toLowerCase().includes(extendedFilters.search.toLowerCase()) && 
          !product.description?.toLowerCase().includes(extendedFilters.search.toLowerCase())) {
        return false;
      }
      
      // Filtre par catégorie
      if (extendedFilters.category && product.category !== extendedFilters.category) {
        return false;
      }
      
      // Filtre par collection principale (sport, lifestyle, prismatic)
      if (extendedFilters.collection) {
        const productCategory = product.category || '';
        const collection = mapCategoryToCollection(productCategory);
        if (collection !== extendedFilters.collection) {
          return false;
        }
        
        // Filtre additionnel par sous-gamme
        if (extendedFilters.subCollection) {
          const subCollection = mapProductToSubCollection(product);
          if (subCollection !== extendedFilters.subCollection) {
            return false;
          }
        }
      }
      
      // Filtre par technologie de lentille
      if (extendedFilters.lensTechnology && product.lens_technology && 
          !product.lens_technology.toLowerCase().includes(extendedFilters.lensTechnology.toLowerCase())) {
        return false;
      }
      
      // Filtre par audio
      if (extendedFilters.hasAudio !== undefined && product.has_audio !== extendedFilters.hasAudio) {
        return false;
      }
      
      // Filtre par protection UV
      if (extendedFilters.uvProtection !== undefined && product.uv_protection !== extendedFilters.uvProtection) {
        return false;
      }
      
      // Filtres de prix
      if (extendedFilters.priceMin !== undefined && product.price < extendedFilters.priceMin) {
        return false;
      }
      if (extendedFilters.priceMax !== undefined && product.price > extendedFilters.priceMax) {
        return false;
      }
      
      // Filtre pour les produits populaires (bestsellers)
      if (extendedFilters.is_popular === 'true' && !product.is_popular) {
        return false;
      }
      
      // Filtre pour les nouveautés
      if (extendedFilters.is_new === 'true' && !product.is_new) {
        return false;
      }
      
      return true;
    });
    
    setFilteredProducts(filtered);
    setLocalLoading(false);
  };

  const handleSync = async () => {
    // Afficher une alerte de chargement
    toast.loading('Synchronisation en cours...', {
      id: 'sync',
    });
    
    try {
      const result = await syncData();
      
      // Mettre à jour l'alerte avec le résultat
      toast.success(`Synchronisation réussie! ${products.length} produits disponibles.`, {
        id: 'sync',
      });
      
      // Mettre à jour les produits filtrés après la synchronisation
      handleSearch();
    } catch (error) {
      // En cas d'erreur
      toast.error(`Erreur de synchronisation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`, {
        id: 'sync',
      });
    }
  };

  // Effet pour charger les données au démarrage
  useEffect(() => {
    // Synchroniser les données au chargement du composant
    handleSync();
  }, []);
  
  // Effet pour filtrer les produits quand les filtres changent
  useEffect(() => {
    handleSearch();
  }, [filters]);
  
  // Effet pour gérer le changement de section active
  useEffect(() => {
    // Réinitialiser les filtres de base
    const newFilters = {
      ...filters,
      search: '',
      collection: '',
      subCollection: '',
      category: '',
      is_popular: '',
      is_new: ''
    };
    
    // Appliquer les filtres spécifiques à chaque section
    switch (activeSection) {
      case 'bestsellers':
        // Filtrer les bestsellers (produits les plus populaires)
        newFilters.is_popular = 'true';
        break;
      case 'new':
        // Filtrer les nouveautés
        newFilters.is_new = 'true';
        break;
      case 'accessories':
        // Accessoires - afficher les collections et sous-collections
        break;
      case 'collections':
      default:
        // Section collections - pas de filtres spéciaux
        break;
    }
    
    setFilters(newFilters);
  }, [activeSection]);

  const formatProductForCard = (product: any): Product => {
    // Extraction des technologies/caractéristiques pour l'affichage
    const features = [];
    if (product.lens_technology) {
      if (Array.isArray(product.lens_technology)) {
        features.push(...product.lens_technology);
      } else {
        features.push(product.lens_technology);
      }
    }
    
    if (product.has_audio) features.push('Audio');
    if (product.uv_protection) features.push('Protection UV');
    if (product.vlt_range) features.push(`Transmission: ${product.vlt_range}`);
    
    return {
      id: product.id,
      name: product.name || product.title, // Compatibilité avec différentes sources
      slug: `/chamelo-catalog/product/${product.handle}`, // Lien vers la page de détail Chamelo
      description: product.description || product.body_html ? 
                  (product.description || product.body_html).replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '',
      price: product.price_min || product.price,
      original_price: product.compare_at_price,
      originalPrice: product.compare_at_price,
      images: product.main_image ? [product.main_image] : 
              (product.images && product.images.length > 0) ? [product.images[0]] : ['/placeholder.jpg'],
      category: product.category || 'lifestyle' as const,
      // Extraire la collection à partir du product_type ou des tags
      collection: mapCategoryToCollection(product.category || ''),
      color: [],
      usage: 'quotidien' as const,
      genre: 'mixte' as const,
      specifications: {
        lens_technology: product.lens_technology,
        has_audio: product.has_audio,
        uv_protection: product.uv_protection
      },
      is_new: product.tags?.some((tag: string) => tag.toLowerCase().includes('new')),
      isNew: product.tags?.some((tag: string) => tag.toLowerCase().includes('new')),
      is_popular: product.tags?.some((tag: string) => tag.toLowerCase().includes('bestseller')),
      isPopular: product.tags?.some((tag: string) => tag.toLowerCase().includes('bestseller')),
      is_featured: false,
      in_stock: product.available,
      inStock: product.available,
      stock_quantity: product.available ? 10 : 0,
      review_count: 0,
      reviewCount: 0,
      features: features,
      rating: 4.5,
      created_at: new Date().toISOString()
    };
  };

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
              disabled={apiLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              <RefreshCw className={`w-4 h-4 ${apiLoading ? 'animate-spin' : ''}`} />
              Synchroniser
            </button>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
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

              {/* Navigation principale du catalogue avec Mega Menu */}
              <div className="relative mb-8">
                <div className="flex flex-col sm:flex-row gap-3 my-4 w-full border-b pb-2">
                  <button 
                    onClick={() => setActiveSection('collections')}
                    className={`px-4 py-2 ${activeSection === 'collections' ? 'border-b-2 border-blue-500 text-blue-500 font-medium -mb-2 pb-2' : 'text-gray-700'} hover:text-blue-500`}
                  >
                    Par collections
                  </button>
                  <button 
                    onClick={() => setActiveSection('bestsellers')}
                    className={`px-4 py-2 ${activeSection === 'bestsellers' ? 'border-b-2 border-blue-500 text-blue-500 font-medium -mb-2 pb-2' : 'text-gray-700'} hover:text-blue-500`}
                  >
                    Bestsellers
                  </button>
                  <button 
                    onClick={() => setActiveSection('new')}
                    className={`px-4 py-2 ${activeSection === 'new' ? 'border-b-2 border-blue-500 text-blue-500 font-medium -mb-2 pb-2' : 'text-gray-700'} hover:text-blue-500`}
                  >
                    Nouveautés
                  </button>
                  <button 
                    onClick={() => setActiveSection('accessories')}
                    className={`px-4 py-2 ${activeSection === 'accessories' ? 'border-b-2 border-blue-500 text-blue-500 font-medium -mb-2 pb-2' : 'text-gray-700'} hover:text-blue-500`}
                  >
                    Accessoires
                  </button>
                </div>
                
                {/* Mega Menu pour la section Collections */}
                {activeSection === 'collections' && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-6 z-50 border-t mt-1">
                    <div className="grid grid-cols-3 gap-8">
                      {/* Sport Collection */}
                      <div>
                        <h3 className="font-bold text-lg border-b pb-2 mb-4 uppercase">Sport</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {subCollections.sport.map((item) => (
                            <div 
                              key={item.name} 
                              className="cursor-pointer hover:text-blue-500 transition-all"
                              onClick={() => setFilters({...filters, collection: 'sport', subCollection: item.name})}
                            >
                              <div className="aspect-square bg-gray-100 mb-2 rounded overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-sm">{item.name}</p>
                            </div>
                          ))}
                          <div 
                            className="cursor-pointer hover:text-blue-500 transition-all"
                            onClick={() => setFilters({...filters, collection: 'sport', subCollection: ''})}
                          >
                            <div className="aspect-square bg-gray-50 mb-2 rounded overflow-hidden flex items-center justify-center">
                              <span className="text-gray-400">...</span>
                            </div>
                            <p className="text-sm">Voir tout</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Lifestyle Collection */}
                      <div>
                        <h3 className="font-bold text-lg border-b pb-2 mb-4 uppercase">Lifestyle</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {subCollections.lifestyle.map((item) => (
                            <div 
                              key={item.name} 
                              className="cursor-pointer hover:text-blue-500 transition-all"
                              onClick={() => setFilters({...filters, collection: 'lifestyle', subCollection: item.name})}
                            >
                              <div className="aspect-square bg-gray-100 mb-2 rounded overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-sm">{item.name}</p>
                            </div>
                          ))}
                          <div 
                            className="cursor-pointer hover:text-blue-500 transition-all"
                            onClick={() => setFilters({...filters, collection: 'lifestyle', subCollection: ''})}
                          >
                            <div className="aspect-square bg-gray-50 mb-2 rounded overflow-hidden flex items-center justify-center">
                              <span className="text-gray-400">...</span>
                            </div>
                            <p className="text-sm">Voir tout</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Prismatic Collection */}
                      <div>
                        <h3 className="font-bold text-lg border-b pb-2 mb-4 uppercase">Prismatic</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {subCollections.prismatic.map((item) => (
                            <div 
                              key={item.name} 
                              className="cursor-pointer hover:text-blue-500 transition-all"
                              onClick={() => setFilters({...filters, collection: 'prismatic', subCollection: item.name})}
                            >
                              <div className="aspect-square bg-gray-100 mb-2 rounded overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-sm">{item.name}</p>
                            </div>
                          ))}
                          <div 
                            className="cursor-pointer hover:text-blue-500 transition-all"
                            onClick={() => setFilters({...filters, collection: 'prismatic', subCollection: ''})}
                          >
                            <div className="aspect-square bg-gray-50 mb-2 rounded overflow-hidden flex items-center justify-center">
                              <span className="text-gray-400">...</span>
                            </div>
                            <p className="text-sm">Voir tout</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Mega Menu pour les Bestsellers */}
                {activeSection === 'bestsellers' && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-6 z-50 border-t mt-1">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-4 mb-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Produits populaires</h3>
                        <p className="text-gray-500 mt-2">Découvrez notre sélection des lunettes les plus populaires</p>
                      </div>
                      {/* Afficher quelques produits populaires */}
                      {products.filter(p => p.is_popular === true).slice(0, 4).map((product) => (
                        <div 
                          key={product.id} 
                          className="cursor-pointer hover:shadow-md transition-all p-2 rounded"
                          onClick={() => window.location.href = `/chamelo-catalog/product/${product.handle}`}
                        >
                          <div className="aspect-square bg-gray-100 mb-2 rounded overflow-hidden">
                            <img 
                              src={product.main_image || (product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg')} 
                              alt={product.name || product.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <p className="font-medium text-sm truncate">{product.name || product.title}</p>
                          <p className="text-blue-600">{product.price_min || product.price} €</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Mega Menu pour les Nouveautés */}
                {activeSection === 'new' && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-6 z-50 border-t mt-1">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-4 mb-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Dernières nouveautés</h3>
                        <p className="text-gray-500 mt-2">Découvrez nos nouvelles lunettes et accessoires</p>
                      </div>
                      {/* Afficher quelques nouveautés */}
                      {products.filter(p => p.is_new === true).slice(0, 4).map((product) => (
                        <div 
                          key={product.id} 
                          className="cursor-pointer hover:shadow-md transition-all p-2 rounded"
                          onClick={() => window.location.href = `/chamelo-catalog/product/${product.handle}`}
                        >
                          <div className="aspect-square bg-gray-100 mb-2 rounded overflow-hidden">
                            <img 
                              src={product.main_image || (product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg')} 
                              alt={product.name || product.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <p className="font-medium text-sm truncate">{product.name || product.title}</p>
                          <p className="text-blue-600">{product.price_min || product.price} €</p>
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">Nouveau</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Mega Menu pour les Accessoires */}
                {activeSection === 'accessories' && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-6 z-50 border-t mt-1">
                    <div className="grid grid-cols-3 gap-8">
                      <div className="col-span-3 mb-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Accessoires pour lunettes Chamelo</h3>
                      </div>
                      {/* Catégories d'accessoires */}
                      <div>
                        <h4 className="font-medium text-md mb-3">Étuis & Protection</h4>
                        <ul className="space-y-2">
                          <li className="hover:text-blue-500 cursor-pointer">Étuis rigides</li>
                          <li className="hover:text-blue-500 cursor-pointer">Étuis souples</li>
                          <li className="hover:text-blue-500 cursor-pointer">Pochettes de protection</li>
                          <li className="hover:text-blue-500 cursor-pointer">Cordons</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-md mb-3">Entretien</h4>
                        <ul className="space-y-2">
                          <li className="hover:text-blue-500 cursor-pointer">Kits de nettoyage</li>
                          <li className="hover:text-blue-500 cursor-pointer">Chiffons microfibre</li>
                          <li className="hover:text-blue-500 cursor-pointer">Sprays nettoyants</li>
                          <li className="hover:text-blue-500 cursor-pointer">Lingettes</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-md mb-3">Pièces & Recharges</h4>
                        <ul className="space-y-2">
                          <li className="hover:text-blue-500 cursor-pointer">Batteries de rechange</li>
                          <li className="hover:text-blue-500 cursor-pointer">Câbles de recharge</li>
                          <li className="hover:text-blue-500 cursor-pointer">Adaptateurs</li>
                          <li className="hover:text-blue-500 cursor-pointer">Vis & pièces de remplacement</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Les filtres additionnels - disponibles indépendamment de la section active */}
              <div className="flex flex-wrap items-center gap-3 my-4">
                <div className="flex items-center">
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Toutes catégories</option>
                    <option value="Premium Smart Glasses">Lunettes Premium</option>
                    <option value="Sports & Performance">Sports & Performance</option>
                    <option value="Lifestyle Smart Glasses">Lifestyle</option>
                    <option value="Intelligent Eyewear">Lunettes Intelligentes</option>
                    <option value="Fashion & Lifestyle">Mode & Lifestyle</option>
                    <option value="Prescription & RX">Prescription & RX</option>
                  </select>
                </div>

                <select
                  value={filters.available}
                  onChange={(e) => setFilters({...filters, available: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tous</option>
                  <option value="true">Disponibles</option>
                  <option value="false">En rupture</option>
                </select>
              </div>

              {/* Modifié pour éviter les doublons - les filtres sont désormais regroupés plus haut */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Sliders className="w-4 h-4" />
                  Filtres avancés
                  {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Vue grille/liste */}
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
              
              {/* Bouton filtres avancés */}
              <button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg ml-auto"
              >
                <Sliders className="w-4 h-4" />
                Filtres avancés
                {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Filtres avancés */}
            {showAdvancedFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Technologie des lentilles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technologie</label>
                  <select
                    value={filters.lensTechnology}
                    onChange={(e) => setFilters({...filters, lensTechnology: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Toutes</option>
                    {lensTypes.map((tech: any) => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>
                
                {/* Audio intégré */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audio</label>
                  <select
                    value={filters.hasAudio}
                    onChange={(e) => setFilters({...filters, hasAudio: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous</option>
                    <option value="true">Avec audio</option>
                    <option value="false">Sans audio</option>
                  </select>
                </div>
                
                {/* Protection UV */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Protection UV</label>
                  <select
                    value={filters.uvProtection}
                    onChange={(e) => setFilters({...filters, uvProtection: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous</option>
                    <option value="true">Avec protection UV</option>
                    <option value="false">Sans protection UV</option>
                  </select>
                </div>
                
                {/* Prix minimum */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix minimum</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Prix maximum */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix maximum</label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Bouton réinitialiser les filtres */}
                <div className="flex items-end">
                  <button
                    onClick={() => setFilters({
                      search: '',
                      collection: '',
                      subCollection: '',
                      category: '',
                      available: 'all',
                      priceRange: 'all',
                      lensTechnology: '',
                      is_popular: '',
                      is_new: '',
                      hasAudio: '',
                      uvProtection: '',
                      priceMin: '',
                      priceMax: ''
                    })}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                  >
                    <X className="w-4 h-4" />
                    Réinitialiser
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Affichage conditionnel: loader ou contenu */}
      {apiLoading || localLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Chargement...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Si aucun filtre n'est appliqué, afficher par collections principales puis par gamme */}
            {!filters.category && !filters.collection && mainCollections.map((collection) => (
              productsByCollection[collection] && productsByCollection[collection].length > 0 && (
                <div key={collection} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center pb-2 border-b">
                    <span className="inline-block w-4 h-4 bg-blue-500 mr-3 rounded-full"></span>
                    {collection.charAt(0).toUpperCase() + collection.slice(1)} {/* Première lettre en majuscule */}
                    <span className="ml-2 text-sm font-normal text-gray-500">({productsByCollection[collection].length})</span>
                  </h2>
                  
                  {/* Affichage par gamme à l'intérieur de chaque collection */}
                  {Object.entries(productsByCollectionAndSeries[collection]).map(([series, seriesProducts]: [string, any[]]) => (
                    seriesProducts.length > 0 && (
                      <div key={`${collection}-${series}`} className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                          <span className="inline-block w-2 h-2 bg-gray-400 mr-2 rounded-full"></span>
                          {series}
                          <span className="ml-2 text-sm font-normal text-gray-500">({seriesProducts.length})</span>
                        </h3>
                        <div className={viewMode === 'grid' 
                          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                          : 'space-y-4'}
                        >
                          {seriesProducts.map((product: any) => (
                            <ProductCard key={product.id} product={formatProductForCard(product)} />
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )
            ))}
            
            {/* Si un filtre est appliqué, afficher sans regroupement */}
            {(filters.category || filters.collection) && (
              <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                  : 'space-y-4'}
              >
                {filteredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={formatProductForCard(product)} />
                ))}
              </div>
            )}
          </div>
        )}

        {products.length === 0 && !apiLoading && !localLoading && (
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
