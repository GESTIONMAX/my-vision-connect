
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

export const SportSection = () => {
  const { data: products = [], isLoading } = useProducts();
  const { addItem } = useCart();
  const { toast } = useToast();

  // Filter sport products - get exactly 9 references
  const sportProducts = products.filter(product => 
    product.collection === 'sport' || product.category === 'sport'
  ).slice(0, 9);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
      reference: product.slug,
      category: product.category || 'Lunettes',
      originalPrice: product.originalPrice
    });

    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre panier`,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
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

      {/* Sport Products Grid - 9 References in 3x3 Grid */}
      {sportProducts.length > 0 ? (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">🔝 9 Références Sport</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Collection complète de lunettes de sport haute performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {sportProducts.map((product, index) => (
              <div key={product.id} className="group">
                {/* Custom Sport Product Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.isPopular && (
                      <Badge className="bg-orange-500 text-white font-semibold text-xs">
                        ⭐ BEST
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="bg-red-500 text-white font-semibold text-xs">
                        SOLDÉ
                      </Badge>
                    )}
                  </div>

                  {/* Quick Add Button */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full h-8 w-8" 
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Product Image Area */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Enhanced sunglasses illustration */}
                      <div className="relative transform group-hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center justify-center gap-1">
                          {/* Left lens */}
                          <div className={`w-16 h-12 rounded-lg border-3 border-gray-800 dark:border-gray-200 shadow-lg ${
                            product.color?.[0] === 'noir' ? 'bg-gradient-to-br from-gray-800/60 to-black/80' :
                            product.color?.[0] === 'rouge' ? 'bg-gradient-to-br from-red-500/60 to-red-700/80' :
                            product.color?.[0] === 'bleu' ? 'bg-gradient-to-br from-blue-500/60 to-blue-700/80' :
                            product.color?.[0] === 'orange' ? 'bg-gradient-to-br from-orange-500/60 to-orange-700/80' :
                            product.color?.[0] === 'fumé' ? 'bg-gradient-to-br from-gray-500/60 to-gray-700/80' :
                            product.color?.[0] === 'iridescent' ? 'bg-gradient-to-br from-purple-500/60 to-pink-500/80' :
                            product.color?.[0] === 'violet' ? 'bg-gradient-to-br from-purple-500/60 to-indigo-700/80' :
                            'bg-gradient-to-br from-blue-600/40 to-purple-600/40'
                          }`}></div>
                          {/* Bridge */}
                          <div className="w-3 h-1.5 bg-gray-800 dark:bg-gray-200 rounded"></div>
                          {/* Right lens */}
                          <div className={`w-16 h-12 rounded-lg border-3 border-gray-800 dark:border-gray-200 shadow-lg ${
                            product.color?.[0] === 'noir' ? 'bg-gradient-to-br from-gray-800/60 to-black/80' :
                            product.color?.[0] === 'rouge' ? 'bg-gradient-to-br from-red-500/60 to-red-700/80' :
                            product.color?.[0] === 'bleu' ? 'bg-gradient-to-br from-blue-500/60 to-blue-700/80' :
                            product.color?.[0] === 'orange' ? 'bg-gradient-to-br from-orange-500/60 to-orange-700/80' :
                            product.color?.[0] === 'fumé' ? 'bg-gradient-to-br from-gray-500/60 to-gray-700/80' :
                            product.color?.[0] === 'iridescent' ? 'bg-gradient-to-br from-purple-500/60 to-pink-500/80' :
                            product.color?.[0] === 'violet' ? 'bg-gradient-to-br from-purple-500/60 to-indigo-700/80' :
                            'bg-gradient-to-br from-blue-600/40 to-purple-600/40'
                          }`}></div>
                        </div>
                        {/* Left arm */}
                        <div className="absolute top-1/2 -left-5 w-6 h-1.5 bg-gray-800 dark:bg-gray-200 rounded transform -translate-y-1/2 rotate-12"></div>
                        {/* Right arm */}
                        <div className="absolute top-1/2 -right-5 w-6 h-1.5 bg-gray-800 dark:bg-gray-200 rounded transform -translate-y-1/2 -rotate-12"></div>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">(4.5)</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">{product.name}</h3>
                    
                    {/* Key Features */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.features?.slice(0, 2).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs px-1 py-0">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {product.price}€
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.originalPrice}€
                            </span>
                          )}
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleAddToCart(product)}
                      >
                        Ajouter
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
            <p>Nos 9 références sport haute performance arrivent bientôt !</p>
          </div>
        </div>
      )}
    </div>
  );
};
