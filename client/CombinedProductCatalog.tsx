
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChameleoData } from '@/hooks/useChameleoData';
import { useProducts } from '@/hooks/useProducts'; // Nouveau hook Supabase
import { ChameleoProduct } from '@/types/chameleo';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/hooks/useProducts';

const CombinedProductCatalog = () => {
  const { products: chameleoProducts, collections, loading: chameleoLoading } = useChameleoData();
  const { data: supabaseProducts = [], isLoading: supabaseLoading } = useProducts(); // Nouveau hook
  const [activeTab, setActiveTab] = useState('all');

  const loading = chameleoLoading || supabaseLoading;

  const formatChameleoProduct = (product: ChameleoProduct): Product => ({
    id: `chamelo-${product.id}`,
    name: product.name,
    slug: product.handle,
    description: product.description.replace(/<[^>]*>/g, '').substring(0, 150),
    price: product.price_min,
    original_price: product.compare_at_price,
    originalPrice: product.compare_at_price,
    images: product.main_image ? [product.main_image] : ['/placeholder.jpg'],
    category: 'lifestyle' as const,
    collection: 'dragon',
    color: [],
    usage: 'quotidien' as const,
    genre: 'mixte' as const,
    specifications: {},
    is_new: false,
    isNew: false,
    is_popular: false,
    isPopular: false,
    is_featured: false,
    in_stock: product.available,
    inStock: product.available,
    stock_quantity: product.available ? 10 : 0,
    review_count: 0,
    reviewCount: 0,
    features: [],
    rating: 4.5,
    created_at: new Date().toISOString()
  });

  const chameleoOnlyProducts = chameleoProducts.map(formatChameleoProduct);
  const allProducts = [
    ...supabaseProducts, // Utilisation des produits Supabase
    ...chameleoOnlyProducts
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Chargement des produits...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Catalogue Produits</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              Tous les Produits ({allProducts.length})
            </TabsTrigger>
            <TabsTrigger value="chamelo">
              Chamelo ({chameleoOnlyProducts.length})
            </TabsTrigger>
            <TabsTrigger value="local">
              Nos Produits ({supabaseProducts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chamelo" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {chameleoOnlyProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="local" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {supabaseProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CombinedProductCatalog;
