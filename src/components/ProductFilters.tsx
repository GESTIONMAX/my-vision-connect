
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sortOptions } from '@/data/products';

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

const categoryTabs = [
  { value: 'all', label: 'ALL' },
  { value: 'popular', label: 'BEST SELLERS' },
  { value: 'sport', label: 'SPORT' },
  { value: 'lifestyle', label: 'LIFESTYLE' },
  { value: 'pro', label: 'PRISMATIC™' },
  { value: 'premium', label: 'CHAMELO BUNDLES' }
];

export const ProductFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultCount 
}: ProductFiltersProps) => {
  const hasActiveFilters = Object.values(filters).some(value => value !== 'all' && value !== 'popularity');

  const handleCategoryClick = (category: string) => {
    // Map les valeurs d'affichage aux vraies catégories de produits
    let actualCategory = category;
    switch (category) {
      case 'popular':
        actualCategory = 'all';
        onFilterChange('sort', 'popularity');
        break;
      case 'lifestyle':
        actualCategory = 'classic';
        break;
      case 'premium':
        actualCategory = 'pro';
        break;
      default:
        actualCategory = category;
    }
    onFilterChange('category', actualCategory);
  };

  const getActiveCategory = () => {
    if (filters.sort === 'popularity' && filters.category === 'all') return 'popular';
    if (filters.category === 'classic') return 'lifestyle';
    if (filters.category === 'pro') return 'premium';
    return filters.category;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header avec compteur de résultats */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Catalogue
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-blue-600 dark:text-blue-400">{resultCount}</span> produit{resultCount > 1 ? 's' : ''}
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

      {/* Onglets de catégories */}
      <div className="p-6">
        <div className="flex flex-wrap gap-1 mb-6">
          {categoryTabs.map((tab) => {
            const isActive = getActiveCategory() === tab.value;
            const isLastItem = tab.value === 'premium';
            
            return (
              <Button
                key={tab.value}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(tab.value)}
                className={`
                  px-4 py-2 text-sm font-medium tracking-wide
                  ${isActive 
                    ? (isLastItem 
                      ? 'bg-black hover:bg-gray-800 text-white border-black' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                    )
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                  }
                  ${isLastItem ? 'ml-2' : ''}
                `}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Filtres secondaires en ligne */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Tri */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Trier par:
            </label>
            <Select value={filters.sort} onValueChange={(value) => onFilterChange('sort', value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
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

          {/* Genre */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Genre:
            </label>
            <Select value={filters.genre} onValueChange={(value) => onFilterChange('genre', value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="mixte">Mixte</SelectItem>
                <SelectItem value="homme">Homme</SelectItem>
                <SelectItem value="femme">Femme</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Usage */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Usage:
            </label>
            <Select value={filters.usage} onValueChange={(value) => onFilterChange('usage', value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="quotidien">Quotidien</SelectItem>
                <SelectItem value="sport">Sport</SelectItem>
                <SelectItem value="conduite">Conduite</SelectItem>
                <SelectItem value="travail">Travail</SelectItem>
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
                    const categoryTab = categoryTabs.find(tab => {
                      if (value === 'classic') return tab.value === 'lifestyle';
                      if (value === 'pro') return tab.value === 'premium';
                      return tab.value === value;
                    });
                    label = categoryTab?.label || value;
                    break;
                  case 'genre':
                    label = value === 'mixte' ? 'Mixte' : value === 'homme' ? 'Homme' : 'Femme';
                    break;
                  case 'usage':
                    label = value.charAt(0).toUpperCase() + value.slice(1);
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
