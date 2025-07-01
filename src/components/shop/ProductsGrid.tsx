
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';

interface ProductsGridProps {
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  priceRange: [number, number];
  selectedBrands: string[];
}

export const ProductsGrid = ({
  selectedCategory,
  searchQuery,
  sortBy,
  priceRange,
  selectedBrands,
}: ProductsGridProps) => {
  const { data: products, isLoading, error } = useProducts();

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
        <p className="text-gray-500">Aucun produit trouvé</p>
      </div>
    );
  }

  // Filter products based on criteria
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
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

    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand || '')) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="flex-1">
      <div className="mb-6">
        <p className="text-gray-600">
          {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
