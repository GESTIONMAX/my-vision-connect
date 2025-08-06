import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGroupedSpecifications, useHighlightedSpecifications } from '@/hooks/useProductSpecifications';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Ruler, Cog, Palette, Shield } from 'lucide-react';

interface ProductSpecificationsViewProps {
  productId: string;
  className?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'dimensions':
      return Ruler;
    case 'materials':
    case 'matériaux':
      return Shield;
    case 'features':
    case 'fonctionnalités':
      return Cog;
    case 'design':
      return Palette;
    default:
      return Cog;
  }
};

const getCategoryLabel = (category: string) => {
  switch (category.toLowerCase()) {
    case 'dimensions':
      return 'Dimensions';
    case 'materials':
    case 'matériaux':
      return 'Matériaux';
    case 'features':
    case 'fonctionnalités':
      return 'Fonctionnalités';
    case 'design':
      return 'Design';
    default:
      return category;
  }
};

export const ProductSpecificationsView: React.FC<ProductSpecificationsViewProps> = ({
  productId,
  className,
}) => {
  const { data: groupedSpecs, isLoading: isLoadingGrouped } = useGroupedSpecifications(productId);
  const { data: highlightedSpecs, isLoading: isLoadingHighlighted } = useHighlightedSpecifications(productId);

  if (isLoadingGrouped || isLoadingHighlighted) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!groupedSpecs || Object.keys(groupedSpecs).length === 0) {
    return null;
  }

  const categories = Object.keys(groupedSpecs);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cog className="w-5 h-5" />
          Spécifications techniques
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Spécifications en vedette */}
        {highlightedSpecs && highlightedSpecs.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Points clés</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {highlightedSpecs.map((spec) => (
                <div key={spec.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">{spec.spec_name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{spec.spec_value}</span>
                    {spec.spec_unit && (
                      <span className="text-xs text-muted-foreground">{spec.spec_unit}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="mt-6" />
          </div>
        )}
        
        {/* Spécifications par catégorie */}
        {categories.length > 1 ? (
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.slice(0, 4).map((category) => {
                const Icon = getCategoryIcon(category);
                return (
                  <TabsTrigger key={category} value={category} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{getCategoryLabel(category)}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-4">
                <div className="space-y-3">
                  {groupedSpecs[category].map((spec) => (
                    <div key={spec.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{spec.spec_name}</span>
                        {spec.is_highlight && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Vedette
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-right">
                        <span className="text-sm">{spec.spec_value}</span>
                        {spec.spec_unit && (
                          <span className="text-xs text-muted-foreground">{spec.spec_unit}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          // Affichage simple si une seule catégorie
          <div className="space-y-3">
            {Object.entries(groupedSpecs).map(([category, specs]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3">
                  {React.createElement(getCategoryIcon(category), { className: "w-4 h-4" })}
                  <span className="text-sm font-medium">{getCategoryLabel(category)}</span>
                </div>
                
                <div className="space-y-2 pl-6">
                  {specs.map((spec) => (
                    <div key={spec.id} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{spec.spec_name}</span>
                        {spec.is_highlight && (
                          <Badge variant="outline" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{spec.spec_value}</span>
                        {spec.spec_unit && (
                          <span className="text-xs text-muted-foreground">{spec.spec_unit}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};