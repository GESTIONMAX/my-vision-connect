import React, { useState, useEffect } from 'react';
import { ShopHeader } from '../components/shop/ShopHeader';
import { CategoryTabs } from '../components/shop/CategoryTabs';
import { ProductCard } from '../components/shop/ProductCard';
import { ProductFilters } from '../components/shop/ProductFilters';
import { Pagination } from '../components/ui/pagination';
import { useProduits } from '../hooks/useProduits';
import { useCollections } from '../hooks/useCollections';
import { Produit } from '../types/product';
import { PaginatedResponse } from '../types/api';
import { ProduitFilters } from '../api/services/productService';

const Shop = () => {
  // État de la pagination
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 9 // Nombre de produits par page
  });
  
  // État des filtres
  const [filters, setFilters] = useState<ProduitFilters>({
    category: 'best-sellers',
    color: 'all',
    shape: 'all',
    tech: 'all',
    sort: 'best-rating',
    collection: 'all',
    ...pagination // Inclure la pagination dans les filtres
  });
  
  // État du panier local pour démo
  const [cart, setCart] = useState<Produit[]>([]);
  
  // Données mockées pour les onglets de catégories
  const categories = [
    { id: 'best-sellers', label: 'BEST SELLERS' },
    { id: 'sport', label: 'SPORT' },
    { id: 'lifestyle', label: 'LIFESTYLE' },
    { id: 'prismatic', label: 'PRISMATIC' },
  ];
  
  // Données mockées pour les options de tri
  const sortOptions = [
    { id: 'best-rating', label: 'Best Rating' },
    { id: 'price-low-high', label: 'Price: Low to High' },
    { id: 'price-high-low', label: 'Price: High to Low' },
  ];
  
  // Données mockées pour les collections
  const mockCollections = [
    { id: 'black', label: 'Black', count: 10 },
    { id: 'sunglasses', label: 'SUNGLASSES', count: 8 },
    { id: 'white', label: 'White', count: 5 },
    { id: 'tech', label: 'TECH', count: 7 },
  ];
  
  // Données mockées pour les couleurs
  const colors = [
    { id: 'black', label: 'Black', count: 10 },
    { id: 'blue', label: 'Blue', count: 8 },
    { id: 'white', label: 'White', count: 5 },
    { id: 'red', label: 'Red', count: 7 },
  ];
  
  // Données mockées pour les formes
  const shapes = [
    { id: 'oval', label: 'Oval', count: 10 },
    { id: 'rectangle', label: 'Rectangle', count: 8 },
    { id: 'square', label: 'Square', count: 5 },
    { id: 'round', label: 'Round', count: 7 },
  ];
  
  // Données mockées pour les technologies
  const technologies = [
    { id: 'basic', label: 'Basic (audio)', count: 10 },
    { id: 'pro', label: 'Pro (7+1)', count: 8 },
    { id: 'advanced', label: 'Advanced (4+1)', count: 5 },
  ];
  
  // Utilisation des hooks pour récupérer les produits et collections
  const { getProduits } = useProduits();
  const { getCollections } = useCollections();
  
  // Récupération des produits avec les filtres et pagination
  const { data: produitsData = { items: [], total: 0, page: 1, pageSize: 9, totalPages: 1 }, isLoading: loadingProduits } = getProduits(filters);
  
  // Récupération des collections
  const { data: collections = [], isLoading: loadingCollections } = getCollections();
  
  // Données mockées pour les produits (en cas d'API indisponible)
  const mockProduits: Produit[] = [
    {
      id: 1,
      nom: 'Shield',
      description: 'Protection maximale pour vos yeux avec un design moderne',
      prix: 249.99,
      disponible: true,
      dateCreation: new Date().toISOString(),
      dateModification: new Date().toISOString(),
      image: '/placeholder.svg'
    },
    {
      id: 2,
      nom: 'Falcon',
      description: 'Vision perçante et style élégant pour tous vos besoins',
      prix: 299.99,
      disponible: true,
      dateCreation: new Date().toISOString(),
      dateModification: new Date().toISOString(),
      image: '/placeholder.svg'
    },
    {
      id: 3,
      nom: 'Urban Classic',
      description: 'Le style urbain par excellence avec confort optimal',
      prix: 149.99,
      disponible: true,
      dateCreation: new Date().toISOString(),
      dateModification: new Date().toISOString(),
      image: '/placeholder.svg'
    },
    {
      id: 4,
      nom: 'Music Shield',
      description: 'La combinaison parfaite entre protection et audio premium',
      prix: 299.99,
      disponible: true,
      dateCreation: new Date().toISOString(),
      dateModification: new Date().toISOString(),
      image: '/placeholder.svg'
    },
    {
      id: 5,
      nom: 'Sport Pro',
      description: 'Conçu pour les athlètes et les activités sportives intenses',
      prix: 199.99,
      disponible: true,
      dateCreation: new Date().toISOString(),
      dateModification: new Date().toISOString(),
      image: '/placeholder.svg'
    },
    {
      id: 6,
      nom: 'Dragon Connect',
      description: 'Connectivité avancée et design futuriste pour les technophiles',
      prix: 279.99,
      disponible: true,
      dateCreation: new Date().toISOString(),
      dateModification: new Date().toISOString(),
      image: '/placeholder.svg'
    },
  ];
  
  // Gestion du changement de filtres
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === prev[key] ? 'all' : value,
      // Réinitialiser la page lors d'un changement de filtre
      page: 1
    }));
  };
  
  // Gestion de la sélection de catégorie
  const handleCategoryChange = (categoryId: string) => {
    setFilters(prev => ({ 
      ...prev, 
      category: categoryId,
      // Réinitialiser la page lors d'un changement de catégorie
      page: 1
    }));
  };
  
  // Gestion du changement de page
  const handlePageChange = (page: number) => {
    const newPagination = { ...pagination, page };
    setPagination(newPagination);
    setFilters(prev => ({ ...prev, page }));
  };
  
  // Ajouter au panier
  const handleAddToCart = (product: Produit) => {
    setCart(prev => [...prev, product]);
    alert(`${product.nom} ajouté au panier`);
  };
  
  // Utiliser les produits mockés si l'API ne renvoie rien ou si la réponse est vide
  const displayedProducts = produitsData.items.length > 0 
    ? produitsData.items 
    : mockProduits;
  
  // Récupérer les informations de pagination
  const totalPages = produitsData.totalPages || Math.ceil(mockProduits.length / pagination.pageSize);
  const currentPage = produitsData.page || pagination.page;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête et navigation */}
      <div className="container mx-auto px-4 py-8">
        {/* Fil d'ariane et titre */}
        <ShopHeader 
          title="Shop All" 
          breadcrumbs={[{label: 'HOME', url: '/'}, {label: 'SHOP ALL'}]}
          promotionalText="Offre spéciale ! Livraison gratuite pour toute commande supérieure à 150€"
        />
        
        {/* Onglets de catégories */}
        <CategoryTabs 
          categories={categories} 
          activeCategory={filters.category || 'best-sellers'} 
          onSelectCategory={handleCategoryChange}
          className="mt-6"
        />
        
        {/* Grille de produits avec filtres */}
        <div className="mt-8 flex flex-col md:flex-row gap-6">
          {/* Filtres */}
          <div className="w-full md:w-64">
            <ProductFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              availableSortOptions={sortOptions}
              availableCollections={mockCollections}
              availableColors={colors}
              availableShapes={shapes}
              availableTechnologies={technologies}
            />
          </div>
          
          {/* Grille de produits */}
          <div className="flex-1">
            {loadingProduits ? (
              <div className="flex justify-center items-center h-64">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <div className="flex flex-col space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.map((produit) => (
                    <ProductCard
                      key={produit.id}
                      product={produit}
                      onAddToCart={handleAddToCart}
                      badge={produit.id % 3 === 0 ? 'POPULAIRE' : undefined}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-8"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
