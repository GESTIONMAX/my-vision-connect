import React from 'react';
import { cn } from '@/lib/utils';
import { useProductVariants, ProductVariant } from '@/hooks/useProductVariants';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductVariantSelectorProps {
  productId: string;
  selectedVariantId?: string;
  onVariantSelect: (variant: ProductVariant) => void;
  className?: string;
}

export const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  productId,
  selectedVariantId,
  onVariantSelect,
  className,
}) => {
  const { data: variants, isLoading, error } = useProductVariants(productId);

  if (isLoading) {
    return (
      <div className={cn("space-y-3", className)}>
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-12 h-12 rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("text-destructive text-sm", className)}>
        Erreur lors du chargement des variants
      </div>
    );
  }

  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">Couleur:</span>
        {selectedVariantId && (
          <span className="text-sm text-muted-foreground">
            {variants.find(v => v.id === selectedVariantId)?.name}
          </span>
        )}
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onVariantSelect(variant)}
            className={cn(
              "w-12 h-12 rounded-full border-2 transition-all duration-200 hover:scale-105",
              "flex items-center justify-center relative overflow-hidden",
              selectedVariantId === variant.id
                ? "border-primary shadow-md"
                : "border-border hover:border-primary/50"
            )}
            style={{
              backgroundColor: variant.hex_color || '#e5e7eb',
            }}
            title={variant.name}
          >
            {variant.hex_color && (
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: variant.hex_color }}
              />
            )}
            
            {selectedVariantId === variant.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
              </div>
            )}
            
            {variant.stock_quantity === 0 && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <div className="w-0.5 h-6 bg-destructive rotate-45" />
              </div>
            )}
          </button>
        ))}
      </div>
      
      {selectedVariantId && (
        <div className="text-xs text-muted-foreground">
          {variants.find(v => v.id === selectedVariantId)?.stock_quantity === 0 ? (
            <span className="text-destructive">Rupture de stock</span>
          ) : (
            <span>
              Stock: {variants.find(v => v.id === selectedVariantId)?.stock_quantity} unités
            </span>
          )}
        </div>
      )}
    </div>
  );
};