import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
// import { ProductVariantSelector } from './ProductVariantSelector';
import { ProductOptionSelector } from './ProductOptionSelector';
import { useProductConfigurationState } from '@/hooks/useProductConfigCombined';
// import { useDefaultVariant } from '@/hooks/useProductVariants';
import { useDefaultOptions } from '@/hooks/useProductOptions';
import { Product } from '@/hooks/useProducts';
import { Loader2, Euro } from 'lucide-react';

interface ProductConfiguratorProps {
  product: Product;
  onConfigurationChange?: (configuration: {
    variantId?: string;
    optionIds: string[];
    finalPrice: number;
    isValid: boolean;
  }) => void;
  className?: string;
}

export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({
  product,
  onConfigurationChange,
  className,
}) => {
  const {
    configuration,
    selectVariant,
    toggleOption,
    updateConfiguration,
    isCalculating,
  } = useProductConfigurationState(product.id);

  // const { data: defaultVariant } = useDefaultVariant(product.id);
  const { data: defaultOptions } = useDefaultOptions(product.id);

  // Initialiser avec les valeurs par défaut (désactivé temporairement)

  useEffect(() => {
    if (defaultOptions && configuration.selectedOptionIds.length === 0) {
      const defaultOptionIds = defaultOptions.map(option => option.id);
      updateConfiguration({ selectedOptionIds: defaultOptionIds });
    }
  }, [defaultOptions, configuration.selectedOptionIds.length, updateConfiguration]);

  // Notifier les changements de configuration
  useEffect(() => {
    if (onConfigurationChange) {
      onConfigurationChange({
        variantId: configuration.selectedVariantId,
        optionIds: configuration.selectedOptionIds,
        finalPrice: configuration.calculatedPrice,
        isValid: configuration.isValid,
      });
    }
  }, [configuration, onConfigurationChange]);

  const basePrice = product.price;
  const calculatedPrice = configuration.calculatedPrice || basePrice;
  const hasDiscount = calculatedPrice < basePrice;
  const hasUpcharge = calculatedPrice > basePrice;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Configuration du produit</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Sélecteur de variant - temporairement désactivé */}
        <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          Sélecteur de variants (en développement)
        </div>
        
        <Separator />
        
        {/* Sélecteur d'options */}
        <ProductOptionSelector
          productId={product.id}
          selectedOptionIds={configuration.selectedOptionIds}
          onOptionToggle={toggleOption}
        />
        
        <Separator />
        
        {/* Résumé des prix */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Prix de base:</span>
            <span className="text-sm text-muted-foreground">
              {basePrice.toFixed(2)}€
            </span>
          </div>
          
          {configuration.selectedOptionIds.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">
                Configuration sélectionnée:
              </div>
              <div className="pl-2 space-y-1">
                {configuration.selectedOptionIds.map((optionId) => (
                  <div key={optionId} className="text-xs">
                    <Badge variant="secondary" className="text-xs">
                      Option {optionId.slice(0, 8)}...
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold">Prix final:</span>
            <div className="flex items-center gap-2">
              {isCalculating && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              
              <div className="flex items-center gap-1">
                <Euro className="w-4 h-4" />
                <span className={cn(
                  "text-lg font-bold",
                  hasDiscount && "text-green-600",
                  hasUpcharge && "text-orange-600"
                )}>
                  {calculatedPrice.toFixed(2)}
                </span>
              </div>
              
              {hasDiscount && (
                <Badge variant="secondary" className="text-xs text-green-600">
                  -{(basePrice - calculatedPrice).toFixed(2)}€
                </Badge>
              )}
              
              {hasUpcharge && (
                <Badge variant="secondary" className="text-xs text-orange-600">
                  +{(calculatedPrice - basePrice).toFixed(2)}€
                </Badge>
              )}
            </div>
          </div>
          
          {!configuration.isValid && configuration.selectedVariantId && (
            <div className="text-xs text-destructive">
              Configuration non valide ou en rupture de stock
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};