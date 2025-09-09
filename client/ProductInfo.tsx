
import { motion } from 'framer-motion';
import { Star, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/hooks/useProducts';

interface ProductInfoProps {
  product: Product;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ProductInfo = ({ product, selectedColor, onColorChange }: ProductInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-wrap gap-2">
        {product.isNew && (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            Nouveau
          </Badge>
        )}
        {product.isPopular && (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
            Populaire
          </Badge>
        )}
        {!product.inStock && (
          <Badge variant="destructive">
            Rupture de stock
          </Badge>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating} ({product.reviewCount} avis)
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
          {product.price}€
        </span>
        {product.originalPrice && (
          <span className="text-xl text-gray-500 line-through">
            {product.originalPrice}€
          </span>
        )}
        {product.originalPrice && (
          <Badge variant="destructive">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </Badge>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {product.description}
      </p>

      <div>
        <h3 className="font-semibold mb-3">Couleur</h3>
        <div className="flex flex-wrap gap-2">
          {product.color.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`px-4 py-2 rounded-lg border-2 transition-colors capitalize ${
                selectedColor === color
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Caractéristiques principales</h3>
        <div className="grid grid-cols-2 gap-2">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
