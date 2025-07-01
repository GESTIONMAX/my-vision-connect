
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

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
      <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative px-8 py-16 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-6">Gamme Sport – Chamelo</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Des lunettes de sport hautes performances alliant technologie, style et confort pour les athlètes exigeants.
              </p>
            </div>
            
            {/* Key Technologies */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  🎧
                </div>
                <span className="text-sm font-medium">Audio intégré</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  🌗
                </div>
                <span className="text-sm font-medium">Teinte ajustable</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  🛡️
                </div>
                <span className="text-sm font-medium">Protection avancée</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  👂
                </div>
                <span className="text-sm font-medium">Branches adaptatives</span>
              </div>
            </div>

            {/* Available Colors */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">🎨 Coloris disponibles :</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['Noir', 'Rouge', 'Bleu', 'Orange', 'Fumé', 'Iridescent', 'Violet'].map((color) => (
                  <Badge key={color} variant="outline" className="text-white border-white/30 bg-white/10 hover:bg-white/20">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sport Products Grid */}
      {sportProducts.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">🔝 Modèles proposés</h2>
            <div className="text-sm text-gray-600">
              {sportProducts.length} produit{sportProducts.length > 1 ? 's' : ''} trouvé{sportProducts.length > 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sportProducts.map((product, index) => (
              <div key={product.id} className="group">
                {/* Custom Sport Product Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.isPopular && (
                      <Badge className="bg-orange-500 text-white font-semibold">
                        ⭐ BEST SELLER
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="bg-red-500 text-white font-semibold">
                        SOLDÉ
                      </Badge>
                    )}
                  </div>

                  {/* Product Image Area */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Stylized sunglasses illustration */}
                      <div className="relative transform group-hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center justify-center gap-1">
                          {/* Left lens */}
                          <div className="w-20 h-16 rounded-lg border-4 border-gray-800 dark:border-gray-200 bg-gradient-to-br from-blue-600/40 to-purple-600/40 shadow-lg"></div>
                          {/* Bridge */}
                          <div className="w-4 h-2 bg-gray-800 dark:bg-gray-200 rounded"></div>
                          {/* Right lens */}
                          <div className="w-20 h-16 rounded-lg border-4 border-gray-800 dark:border-gray-200 bg-gradient-to-br from-blue-600/40 to-purple-600/40 shadow-lg"></div>
                        </div>
                        {/* Left arm */}
                        <div className="absolute top-1/2 -left-6 w-8 h-2 bg-gray-800 dark:bg-gray-200 rounded transform -translate-y-1/2 rotate-12"></div>
                        {/* Right arm */}
                        <div className="absolute top-1/2 -right-6 w-8 h-2 bg-gray-800 dark:bg-gray-200 rounded transform -translate-y-1/2 -rotate-12"></div>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">(4.5)</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features?.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          ✅ {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Color options */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-600">Couleurs:</span>
                      <div className="flex gap-1">
                        {product.color?.slice(0, 4).map((color) => (
                          <div
                            key={color}
                            className="w-4 h-4 rounded-full border-2 border-gray-300"
                            style={{
                              backgroundColor: color === 'noir' ? '#000' : 
                                             color === 'rouge' ? '#ef4444' :
                                             color === 'bleu' ? '#3b82f6' :
                                             color === 'orange' ? '#f97316' : '#6b7280'
                            }}
                          />
                        ))}
                        {product.color && product.color.length > 4 && (
                          <span className="text-xs text-gray-500">+{product.color.length - 4}</span>
                        )}
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {product.price}€
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                              {product.originalPrice}€
                            </span>
                          )}
                        </div>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        SHOP NOW
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
