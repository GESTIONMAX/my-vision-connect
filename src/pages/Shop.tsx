import { PromotionalBanner } from '../components/shop/PromotionalBanner';
import { CategoryTabs } from '../components/shop/CategoryTabs';
import { ProductsGrid } from '../components/shop/ProductsGrid';
import { ProductFilters } from '../components/ProductFilters';
import { useState, useEffect } from 'react';

const Shop = () => {
  console.log('Shop component rendering...');
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filters, setFilters] = useState({
    category: 'all',
    color: 'all',
    usage: 'all',
    genre: 'all',
    sort: 'featured',
    collection: 'all',
  });

  useEffect(() => {
    console.log('Shop component mounted');
    return () => console.log('Shop component unmounted');
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    console.log('Filter changed:', key, value);
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    console.log('Clearing all filters');
    setFilters({
      category: 'all',
      color: 'all',
      usage: 'all',
      genre: 'all',
      sort: 'featured',
      collection: 'all',
    });
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 border-4 border-red-500">
      <div className="border-4 border-yellow-500">
        <PromotionalBanner />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 border-4 border-blue-500">
        <div className="mb-8 border-4 border-purple-500 p-2">
          <nav className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>HOME / SHOP ALL</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Shop All
          </h1>
        </div>
        
        <div className="mb-8 border-4 border-pink-500 p-2">
          <CategoryTabs 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 border-4 border-indigo-500 p-2">
            <ProductsGrid
              selectedCategory={selectedCategory}
              searchQuery=""
              sortBy={filters.sort}
              priceRange={[0, 1000]}
              selectedBrands={[]}
              filters={filters}
            />
          </div>
          
          <div className="lg:w-80 border-4 border-teal-500 p-2">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              resultCount={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
