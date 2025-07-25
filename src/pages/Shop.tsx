
import { ShopHero } from '@/components/shop/ShopHero';
import { PromotionalBanner } from '@/components/shop/PromotionalBanner';
import { CategoryTabs } from '@/components/shop/CategoryTabs';
import { ProductsGrid } from '@/components/shop/ProductsGrid';
import { ProductFilters } from '@/components/ProductFilters';
import CustomCatalog from '@/components/shop/CustomCatalog';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Shop = () => {
  const [activeTab, setActiveTab] = useState<string>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filters, setFilters] = useState({
    category: 'all',
    color: 'all',
    usage: 'all',
    genre: 'all',
    sort: 'featured',
    collection: 'all',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ShopHero />
      <PromotionalBanner />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>HOME / SHOP ALL</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Shop All
          </h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50">
            <TabsTrigger value="catalog" className="text-lg font-medium">
              Lunettes connectées
            </TabsTrigger>
            <TabsTrigger value="browse" className="text-lg font-medium">
              Parcourir Tous les Produits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="mt-0">
            <CustomCatalog />
          </TabsContent>

          <TabsContent value="browse" className="mt-0">
            <CategoryTabs 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <div className="flex flex-col lg:flex-row gap-8 mt-8">
              <ProductsGrid
                selectedCategory={selectedCategory}
                searchQuery=""
                sortBy={filters.sort}
                priceRange={[0, 1000]}
                selectedBrands={[]}
                filters={filters}
              />
              
              <div className="lg:w-80">
                <ProductFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  resultCount={0}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Shop;
