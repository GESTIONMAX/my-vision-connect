
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/hooks/useProducts';

interface ProductVariantsProps {
  currentProduct: Product;
  variants: Product[];
  onVariantSelect: (variant: Product) => void;
}

export const ProductVariants = ({ currentProduct, variants, onVariantSelect }: ProductVariantsProps) => {
  if (variants.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Variantes disponibles</h3>
      <div className="grid grid-cols-1 gap-4">
        {variants.map((variant) => (
          <div
            key={variant.id}
            className={`border rounded-lg p-4 transition-colors ${
              currentProduct.id === variant.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {variant.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {variant.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {variant.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {variant.price}€
                </div>
                {currentProduct.id !== variant.id && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => onVariantSelect(variant)}
                  >
                    Choisir
                  </Button>
                )}
                {currentProduct.id === variant.id && (
                  <Badge className="mt-2 bg-green-500">
                    Sélectionné
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
