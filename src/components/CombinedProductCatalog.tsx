import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChameleoData } from '@/hooks/useChameleoData';
import { ProductCard } from '@/components/ProductCard';

const CombinedProductCatalog = () => {
  const { products: chameleoProducts, collections, loading } = useChameleoData();
  const [activeTab, setActiveTab] = useState('all');

  // Vos produits existants (à adapter selon votre logique)
  const localProducts = [
    // Récupérer depuis votre source de données locale
  ];

  const formatChameleoProduct = (product: any) => ({
    id: `chamelo-${product.id}`,
    title: product.name,
    description: product.description.replace(/<[^>]*>/g, '').substring(0, 150),
    price: product.price_min,
    originalPrice: product.compare_at_price,
    image: product.main_image || '/placeholder.jpg',
    category: product.product_type,
    vendor: product.vendor,
    available: product.available,
    tags: [...(product.tags || []), 'Chamelo'],
    slug: product.handle,
    source: 'chamelo'
  });

  const allProducts = [
    ...localProducts,
    ...chameleoProducts.map(formatChameleoProduct)
  ];

  const chameleoOnlyProducts = chameleoProducts.map(formatChameleoProduct);

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
              Nos Produits ({localProducts.length})
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
              {localProducts.map(product => (
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
