
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
      <div className="relative bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-12 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Gamme Sport – Chamelo</h1>
            <p className="text-xl opacity-90 mb-8">
              Des lunettes de sport hautes performances alliant technologie, style et confort pour les athlètes exigeants.
            </p>
            
            {/* Key Technologies */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎧</span>
                <span className="text-sm">Audio intégré</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌗</span>
                <span className="text-sm">Teinte ajustable</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛡️</span>
                <span className="text-sm">Protection avancée</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👂</span>
                <span className="text-sm">Branches adaptatives</span>
              </div>
            </div>

            {/* Available Colors */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">🎨 Coloris disponibles :</h3>
              <div className="flex flex-wrap gap-2">
                {['Noir', 'Rouge', 'Bleu', 'Orange', 'Fumé', 'Iridescent', 'Violet'].map((color) => (
                  <Badge key={color} variant="outline" className="text-white border-white/30 bg-white/10">
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
          <h2 className="text-2xl font-bold mb-6">🔝 Modèles proposés :</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportProducts.map((product, index) => (
              <div key={product.id} className="relative">
                {product.isPopular && (
                  <Badge className="absolute top-2 left-2 z-10 bg-orange-500 text-white">
                    ⭐ BEST SELLER
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge className="absolute top-2 right-2 z-10 bg-red-500 text-white">
                    SOLDÉ
                  </Badge>
                )}
                <ProductCard product={product} index={index} />
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
