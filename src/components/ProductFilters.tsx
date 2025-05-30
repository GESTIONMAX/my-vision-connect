
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filtres de recherche
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-blue-600 dark:text-blue-400">{resultCount}</span> produit{resultCount > 1 ? 's' : ''} trouvé{resultCount > 1 ? 's' : ''}
            </span>
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearFilters}
                className="flex items-center gap-2 text-xs"
              >
                <X className="h-3 w-3" />
                Réinitialiser
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Catégorie */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Catégorie
            </label>
            <Select value={filters.category} onValueChange={(value) => onFilterChange('category', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Couleur */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Couleur de monture
            </label>
            <Select value={filters.color} onValueChange={(value) => onFilterChange('color', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Toutes les couleurs" />
              </SelectTrigger>
              <SelectContent>
                {colors.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    {color.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Usage */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Usage principal
            </label>
            <Select value={filters.usage} onValueChange={(value) => onFilterChange('usage', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tous les usages" />
              </SelectTrigger>
              <SelectContent>
                {usages.map((usage) => (
                  <SelectItem key={usage.value} value={usage.value}>
                    {usage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Genre */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Public cible
            </label>
            <Select value={filters.genre} onValueChange={(value) => onFilterChange('genre', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tous les genres" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.value} value={genre.value}>
                    {genre.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tri */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Trier par
            </label>
            <Select value={filters.sort} onValueChange={(value) => onFilterChange('sort', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Popularité" />
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
        </div>

        {/* Filtres actifs */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Filtres actifs :</span>
              {Object.entries(filters).map(([key, value]) => {
                if (value === 'all' || (key === 'sort' && value === 'popularity')) return null;
                
                let label = '';
                switch (key) {
                  case 'category':
                    label = categories.find(c => c.value === value)?.label || value;
                    break;
                  case 'color':
                    label = colors.find(c => c.value === value)?.label || value;
                    break;
                  case 'usage':
                    label = usages.find(u => u.value === value)?.label || value;
                    break;
                  case 'genre':
                    label = genres.find(g => g.value === value)?.label || value;
                    break;
                  case 'sort':
                    label = sortOptions.find(s => s.value === value)?.label || value;
                    break;
                }
                
                return (
                  <div
                    key={key}
                    className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                  >
                    <span>{label}</span>
                    <button
                      onClick={() => onFilterChange(key, key === 'sort' ? 'popularity' : 'all')}
                      className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
