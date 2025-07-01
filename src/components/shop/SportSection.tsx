
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';

export const SportSection = () => {
  const { data: products = [], isLoading } = useProducts();

  // Filter sport products
  const sportProducts = products.filter(product => 
    product.collection === 'sport' || product.category === 'sport'
  );

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section for Sport */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-16 text-white">
          <Badge className="mb-4 bg-orange-500">BEST SELLER</Badge>
          <h2 className="text-4xl font-bold mb-2">Sport</h2>
          <p className="text-lg opacity-90 mb-6">Tint-changing performance sunglasses</p>
          
          {/* Featured Sport Product */}
          {sportProducts.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">{sportProducts[0].name}</h3>
                <p className="opacity-80 mb-4">{sportProducts[0].description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">{sportProducts[0].price}€</span>
                  {sportProducts[0].originalPrice && (
                    <span className="text-lg opacity-60 line-through">
                      {sportProducts[0].originalPrice}€
                    </span>
                  )}
                </div>
              </div>
              
              {/* Simulated product image */}
              <div className="w-64 h-32 flex items-center justify-center">
                <div className="relative">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-20 h-16 rounded-full border-4 border-white bg-gradient-to-br from-orange-400/50 to-red-500/50"></div>
                    <div className="w-4 h-2 bg-white rounded"></div>
                    <div className="w-20 h-16 rounded-full border-4 border-white bg-gradient-to-br from-orange-400/50 to-red-500/50"></div>
                  </div>
                  <div className="absolute top-1/2 -left-6 w-8 h-2 bg-white rounded transform -translate-y-1/2 rotate-12"></div>
                  <div className="absolute top-1/2 -right-6 w-8 h-2 bg-white rounded transform -translate-y-1/2 -rotate-12"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sport Products Grid */}
      {sportProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sportProducts.map((product, index) => (
            <div key={product.id} className="relative">
              {product.isPopular && (
                <Badge className="absolute top-2 left-2 z-10 bg-orange-500 text-white">
                  BEST SELLER
                </Badge>
              )}
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-500 mb-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-2xl">🥽</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Collection Sport en cours de préparation</h3>
            <p>Nos lunettes de sport haute performance arrivent bientôt !</p>
          </div>
        </div>
      )}
    </div>
  );
};
