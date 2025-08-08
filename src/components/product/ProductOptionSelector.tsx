import React from 'react';
import { cn } from '@/lib/utils';
import { useProductOptions, ProductOption } from '@/hooks/useProductOptions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AudioWaveform, VolumeX, Package, Wrench } from 'lucide-react';

interface ProductOptionSelectorProps {
  productId: string;
  selectedOptionIds: string[];
  onOptionToggle: (optionId: string) => void;
  className?: string;
}

const getOptionIcon = (optionType: string) => {
  switch (optionType) {
    case 'audio':
      return AudioWaveform;
    case 'case':
      return Package;
    case 'accessory':
      return Wrench;
    default:
      return Package;
  }
};

const getOptionTypeLabel = (optionType: string) => {
  switch (optionType) {
    case 'audio':
      return 'Audio';
    case 'case':
      return 'Étui';
    case 'accessory':
      return 'Accessoires';
    default:
      return optionType;
  }
};

export const ProductOptionSelector: React.FC<ProductOptionSelectorProps> = ({
  productId,
  selectedOptionIds,
  onOptionToggle,
  className,
}) => {
  const { data: options, isLoading, error } = useProductOptions(productId);

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("text-destructive text-sm", className)}>
        Erreur lors du chargement des options
      </div>
    );
  }

  if (!options || options.length === 0) {
    return null;
  }

  // Grouper les options par type
  const groupedOptions = options.reduce((acc, option) => {
    if (!acc[option.option_type]) {
      acc[option.option_type] = [];
    }
    acc[option.option_type].push(option);
    return acc;
  }, {} as Record<string, ProductOption[]>);

  return (
    <div className={cn("space-y-6", className)}>
      {Object.entries(groupedOptions).map(([optionType, typeOptions]) => {
        const Icon = getOptionIcon(optionType);
        
        return (
          <div key={optionType} className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {getOptionTypeLabel(optionType)}:
              </span>
            </div>
            
            <div className="space-y-2">
              {typeOptions.map((option) => {
                const isSelected = selectedOptionIds.includes(option.id);
                const showPrice = option.price_modifier !== 0;
                
                return (
                  <Button
                    key={option.id}
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "w-full justify-between h-auto p-3 text-left",
                      !option.is_available && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => option.is_available && onOptionToggle(option.id)}
                    disabled={!option.is_available}
                  >
                    <div className="flex items-center gap-3">
                      {optionType === 'audio' && (
                        option.name.toLowerCase().includes('without') ? 
                          <VolumeX className="w-4 h-4" /> : 
                          <AudioWaveform className="w-4 h-4" />
                      )}
                      
                      <div>
                        <div className="font-medium">{option.name}</div>
                        {option.description && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {showPrice && (
                        <Badge 
                          variant={option.price_modifier > 0 ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {option.price_modifier > 0 ? '+' : ''}
                          {option.price_modifier}€
                        </Badge>
                      )}
                      
                      {option.is_default && (
                        <Badge variant="outline" className="text-xs">
                          Défaut
                        </Badge>
                      )}
                      
                      {isSelected && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};