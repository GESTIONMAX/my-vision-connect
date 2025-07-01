
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useProducts } from '@/hooks/useProducts';
import { useCollections } from '@/hooks/useCollections';

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

  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({
    sort: [],
    collection: [],
    frameColor: [],
    lensColor: [],
    tech: [],
    faceSize: []
  });

  const handleCheckboxChange = (section: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (checked) {
        newFilters[section] = [...(newFilters[section] || []), value];
        // Map to the actual filter keys
        const filterKey = section === 'frameColor' ? 'color' : 
                         section === 'lensColor' ? 'color' : 
                         section;
        onFilterChange(filterKey, value);
      } else {
        newFilters[section] = (newFilters[section] || []).filter(item => item !== value);
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      sort: [],
      collection: [],
      frameColor: [],
      lensColor: [],
      tech: [],
      faceSize: []
    });
    onClearFilters();
  };

  const filterSections = [
    {
      title: "SORT BY",
      key: "sort",
      options: [
        { value: "best-selling", label: "Best selling" },
        { value: "price-low", label: "Price, low to high" },
        { value: "price-high", label: "Price, high to low" }
      ]
    },
    {
      title: "COLLECTION",
      key: "collection",
      options: [
        { value: "lifestyle", label: "Lifestyle", count: 16 },
        { value: "prismatic", label: "Prismatic", count: 6 },
        { value: "sport", label: "Sport", count: 36 }
      ]
    },
    {
      title: "FRAME COLOR",
      key: "frameColor",
      options: [
        { value: "noir", label: "Black", count: 41 },
        { value: "noir/or", label: "Black/Gold", count: 2 },
        { value: "transparent", label: "Clear", count: 5 },
        { value: "blanc", label: "White", count: 10 }
      ]
    },
    {
      title: "LENS COLOR",
      key: "lensColor",
      options: [
        { value: "bleu", label: "Blue", count: 6 },
        { value: "calm", label: "Calm", count: 6 },
        { value: "rouge", label: "Fire", count: 26 },
        { value: "violet", label: "Purple", count: 5 },
        { value: "gris", label: "Smoke", count: 13 }
      ]
    },
    {
      title: "TECH",
      key: "tech",
      options: [
        { value: "audio", label: "Built-in audio", count: 22 },
        { value: "adjustable", label: "Adjustable tint", count: 52 },
        { value: "color-changing", label: "Color-changing lenses", count: 4 }
      ]
    },
    {
      title: "FACE SIZE",
      key: "faceSize",
      options: [
        { value: "average", label: "Average", count: 22 },
        { value: "medium-wide", label: "Medium-Wide", count: 10 },
        { value: "narrow", label: "Narrow", count: 2 },
        { value: "wide", label: "Wide", count: 22 }
      ]
    }
  ];

  const getTotalSelectedFilters = () => {
    return Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters ({getTotalSelectedFilters()})
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Sections */}
      <div className="px-6 py-4 max-h-[600px] overflow-y-auto">
        {filterSections.map((section, index) => (
          <div key={section.key} className={index > 0 ? "mt-6" : ""}>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 tracking-wide">
              {section.title}
            </h4>
            <div className="space-y-2">
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
    </div>
  );
};
