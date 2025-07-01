
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';

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

  console.log('ProductsGrid - selectedCategory:', selectedCategory);
  console.log('ProductsGrid - products received:', products?.length || 0);
  console.log('ProductsGrid - first few products:', products?.slice(0, 3));

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
    console.error('ProductsGrid - Error loading products:', error);
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-red-500">Erreur lors du chargement des produits</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    console.log('ProductsGrid - No products found in database');
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Aucun produit trouvé dans la base de données</p>
      </div>
    );
  }

  // Filter products based on criteria
  const filteredProducts = products.filter(product => {
    console.log(`Filtering product: ${product.name}, collection: ${product.collection}, category: ${product.category}`);
    
    // Category filter (now includes collection filtering)
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'best-sellers' && !product.isPopular) {
        console.log(`Product ${product.name} filtered out - not best seller`);
        return false;
      }
      
      // Check if selectedCategory matches a collection slug
      if (selectedCategory !== 'best-sellers' && product.collection !== selectedCategory) {
        console.log(`Product ${product.name} filtered out - collection mismatch. Expected: ${selectedCategory}, Got: ${product.collection}`);
        return false;
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

    console.log(`Product ${product.name} passed all filters`);
    return true;
  });

  console.log('ProductsGrid - Filtered products count:', filteredProducts.length);
  console.log('ProductsGrid - Filtered products:', filteredProducts.map(p => ({ name: p.name, collection: p.collection })));

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
