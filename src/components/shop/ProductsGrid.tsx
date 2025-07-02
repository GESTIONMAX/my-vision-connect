
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { SportSection } from './SportSection';
import { useSubCollections } from '@/hooks/useSubCollections';

interface ProductsGridProps {
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  priceRange: [number, number];
  selectedBrands: string[];
  filters: {
    category: string;
    color: string;
    usage: string;
    genre: string;
    sort: string;
    collection: string;
  };
}

export const ProductsGrid = ({
  selectedCategory,
  searchQuery,
  sortBy,
  priceRange,
  selectedBrands,
  filters,
}: ProductsGridProps) => {
  const { data: products, isLoading, error } = useProducts();
  const { data: subCollections = [] } = useSubCollections();

  // Show specialized Sport section for sport category
  if (selectedCategory === 'sport') {
    return <SportSection />;
  }

  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-red-500">Erreur lors du chargement des produits</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Aucun produit trouvé dans la base de données</p>
      </div>
    );
  }

  // Get parent category for sub-collections
  const getParentCategory = (collection: string) => {
    const subCollection = subCollections.find(sub => sub.slug === collection);
    return subCollection?.parent_collection_slug || collection;
  };

  // Filter products based on criteria
  const filteredProducts = products.filter(product => {
    // Category filter with new hierarchical structure
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'best-sellers' && !product.isPopular) {
        return false;
      }
      
      // Check if selectedCategory is a main category or sub-collection
      const parentCategory = getParentCategory(product.collection);
      const isMainCategory = ['sport', 'lifestyle', 'prismatic'].includes(selectedCategory);
      
      if (isMainCategory) {
        // Filter by main category
        if (parentCategory !== selectedCategory) {
          return false;
        }
      } else {
        // Filter by specific sub-collection
        if (selectedCategory !== 'best-sellers' && product.collection !== selectedCategory) {
          return false;
        }
      }
    }

    // Collection filter from filters sidebar
    if (filters.collection !== 'all' && product.collection !== filters.collection) {
      return false;
    }

    // Category filter from filters
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    // Color filter
    if (filters.color !== 'all' && !product.color?.includes(filters.color)) {
      return false;
    }

    // Usage filter
    if (filters.usage !== 'all' && product.usage !== filters.usage) {
      return false;
    }

    // Genre filter
    if (filters.genre !== 'all' && product.genre !== filters.genre) {
      return false;
    }

    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sort || sortBy) {
      case 'price-low':
      case 'price-asc':
        return a.price - b.price;
      case 'price-high':
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      case 'popularity':
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  if (sortedProducts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Aucun produit trouvé pour la catégorie "{selectedCategory}"</p>
          <p className="text-sm text-gray-400">Essayez de sélectionner une autre catégorie ou de modifier vos filtres</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
