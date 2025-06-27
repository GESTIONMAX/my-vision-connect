
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useProducts } from '@/hooks/useProducts';
import { useCollections } from '@/hooks/useCollections';
import { useFilterOptions } from '@/hooks/useFilterOptions';

interface ProductFiltersProps {
  filters: {
    category: string;
    color: string;
    usage: string;
    genre: string;
    sort: string;
    collection: string;
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
  const { data: products = [] } = useProducts();
  const { data: collections = [] } = useCollections();
  const { data: filterOptions = [] } = useFilterOptions();

  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({
    sort: [],
    collection: [],
    category: [],
    color: [],
    usage: [],
    genre: []
  });

  const handleCheckboxChange = (section: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (checked) {
        newFilters[section] = [...(newFilters[section] || []), value];
        onFilterChange(section, value);
      } else {
        newFilters[section] = (newFilters[section] || []).filter(item => item !== value);
        if (newFilters[section].length === 0) {
          onFilterChange(section, 'all');
        }
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      sort: [],
      collection: [],
      category: [],
      color: [],
      usage: [],
      genre: []
    });
    onClearFilters();
  };

  // Generate dynamic filter options based on actual product data
  const getUniqueCategories = () => {
    const categories = products.map(p => p.category).filter(Boolean);
    const uniqueCategories = [...new Set(categories)];
    return uniqueCategories.map(cat => ({
      value: cat,
      label: cat === 'classic' ? 'Classic' : 
             cat === 'sport' ? 'Sport' : 
             cat === 'pro' ? 'Pro' : 
             cat === 'femme' ? 'Femme' : 
             cat === 'homme' ? 'Homme' : 
             cat === 'lifestyle' ? 'Lifestyle' : cat,
      count: products.filter(p => p.category === cat).length
    }));
  };

  const getUniqueColors = () => {
    const allColors = products.flatMap(p => p.color || []);
    const uniqueColors = [...new Set(allColors)];
    return uniqueColors.map(color => ({
      value: color,
      label: color.charAt(0).toUpperCase() + color.slice(1),
      count: products.filter(p => p.color?.includes(color)).length
    }));
  };

  const getUniqueUsages = () => {
    const usages = products.map(p => p.usage).filter(Boolean);
    const uniqueUsages = [...new Set(usages)];
    return uniqueUsages.map(usage => ({
      value: usage,
      label: usage === 'quotidien' ? 'Quotidien' : 
             usage === 'sport' ? 'Sport' : 
             usage === 'conduite' ? 'Conduite' : 
             usage === 'travail' ? 'Travail' : usage,
      count: products.filter(p => p.usage === usage).length
    }));
  };

  const getUniqueGenres = () => {
    const genres = products.map(p => p.genre).filter(Boolean);
    const uniqueGenres = [...new Set(genres)];
    return uniqueGenres.map(genre => ({
      value: genre,
      label: genre === 'mixte' ? 'Mixte' : 
             genre === 'homme' ? 'Homme' : 
             genre === 'femme' ? 'Femme' : genre,
      count: products.filter(p => p.genre === genre).length
    }));
  };

  const getCollectionOptions = () => {
    return collections.map(collection => ({
      value: collection.slug,
      label: collection.name,
      count: products.filter(p => p.collection === collection.slug).length
    }));
  };

  const filterSections = [
    {
      title: "TRI",
      key: "sort",
      options: [
        { value: "popularity", label: "Plus populaires" },
        { value: "price-asc", label: "Prix croissant" },
        { value: "price-desc", label: "Prix décroissant" },
        { value: "newest", label: "Nouveautés" },
        { value: "rating", label: "Mieux notés" }
      ]
    },
    {
      title: "COLLECTION",
      key: "collection",
      options: getCollectionOptions()
    },
    {
      title: "CATÉGORIE",
      key: "category",
      options: getUniqueCategories()
    },
    {
      title: "COULEUR",
      key: "color",
      options: getUniqueColors()
    },
    {
      title: "USAGE",
      key: "usage",
      options: getUniqueUsages()
    },
    {
      title: "GENRE",
      key: "genre",
      options: getUniqueGenres()
    }
  ];

  const getTotalSelectedFilters = () => {
    return Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filtres ({getTotalSelectedFilters()})
            </h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {resultCount} produit{resultCount > 1 ? 's' : ''} trouvé{resultCount > 1 ? 's' : ''}
        </p>
      </div>

      {/* Filter Sections */}
      <div className="px-6 py-4 max-h-[600px] overflow-y-auto">
        {filterSections.map((section, index) => (
          <div key={section.key} className={index > 0 ? "mt-8" : ""}>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 tracking-wide">
              {section.title}
            </h4>
            <div className="space-y-3">
              {section.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`${section.key}-${option.value}`}
                    checked={selectedFilters[section.key]?.includes(option.value) || false}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(section.key, option.value, checked as boolean)
                    }
                    className="border-gray-300 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`${section.key}-${option.value}`}
                    className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex-1 flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-gray-500 dark:text-gray-400">({option.count})</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-3">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {/* Apply filters logic is handled by individual checkboxes */}}
          >
            APPLIQUER LES FILTRES
          </Button>
          <Button 
            variant="ghost" 
            className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            onClick={clearAllFilters}
          >
            Effacer tout
          </Button>
        </div>
      </div>
    </div>
  );
};
