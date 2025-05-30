
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { categories, colors, usages, genres, sortOptions } from '@/data/products';

interface ProductFiltersProps {
  filters: {
    category: string;
    color: string;
    usage: string;
    genre: string;
    sort: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  resultCount: number;
}

export const ProductFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultCount 
}: ProductFiltersProps) => {
  const hasActiveFilters = Object.values(filters).some(value => value !== 'all' && value !== 'popularity');

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Filtres */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-1">
          <Select value={filters.category} onValueChange={(value) => onFilterChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.color} onValueChange={(value) => onFilterChange('color', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Couleur" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  {color.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.usage} onValueChange={(value) => onFilterChange('usage', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Usage" />
            </SelectTrigger>
            <SelectContent>
              {usages.map((usage) => (
                <SelectItem key={usage.value} value={usage.value}>
                  {usage.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.genre} onValueChange={(value) => onFilterChange('genre', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre.value} value={genre.value}>
                  {genre.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.sort} onValueChange={(value) => onFilterChange('sort', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {resultCount} produit{resultCount > 1 ? 's' : ''}
          </span>
          
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClearFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Effacer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
