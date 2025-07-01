
import { ShopHero } from '@/components/shop/ShopHero';
import { PromotionalBanner } from '@/components/shop/PromotionalBanner';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import { CategoryTabs } from '@/components/shop/CategoryTabs';
import { ProductsGrid } from '@/components/shop/ProductsGrid';
import { useState } from 'react';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ShopHero />
      <PromotionalBanner />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryTabs 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <ShopSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            selectedBrands={selectedBrands}
            onBrandsChange={setSelectedBrands}
          />
          
          <ProductsGrid
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            sortBy={sortBy}
            priceRange={priceRange}
            selectedBrands={selectedBrands}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
