
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/hooks/useCollections';
import { useSubCollections } from '@/hooks/useSubCollections';
import { ChevronDown } from 'lucide-react';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  const { data: collections = [], isLoading } = useCollections();
  const { data: allSubCollections = [] } = useSubCollections();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const staticCategories = [
    { id: 'all', label: 'Tous les produits' },
    { id: 'best-sellers', label: 'Meilleures ventes' },
  ];

  const mainCategories = collections.map(collection => ({
    id: collection.slug,
    label: collection.name,
    subCollections: allSubCollections.filter(sub => sub.parent_collection_slug === collection.slug)
  }));

  const allCategories = [...staticCategories, ...mainCategories];

  if (isLoading) {
    return (
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <div className="animate-pulse bg-gray-200 h-10 w-32 rounded"></div>
        </nav>
      </div>
    );
  }

  const handleMainCategoryClick = (categoryId: string) => {
    if (categoryId === 'all' || categoryId === 'best-sellers') {
      onCategoryChange(categoryId);
      setExpandedCategory(null);
    } else {
      if (expandedCategory === categoryId) {
        setExpandedCategory(null);
      } else {
        setExpandedCategory(categoryId);
      }
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div className="overflow-x-auto">
        <nav className="-mb-px flex space-x-8">
          {allCategories.map((category) => (
            <div key={category.id} className="relative">
              <Button
                variant={selectedCategory === category.id ? "default" : "ghost"}
                className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => handleMainCategoryClick(category.id)}
              >
                {category.label}
                {category.subCollections && category.subCollections.length > 0 && (
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      expandedCategory === category.id ? 'rotate-180' : ''
                    }`} 
                  />
                )}
              </Button>
              
              {/* Dropdown for sub-collections */}
              {expandedCategory === category.id && category.subCollections && category.subCollections.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="py-2">
                    {category.subCollections.map((subCollection) => (
                      <button
                        key={subCollection.slug}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          selectedCategory === subCollection.slug
                            ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => {
                          onCategoryChange(subCollection.slug);
                          setExpandedCategory(null);
                        }}
                      >
                        <div className="font-medium">{subCollection.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {subCollection.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
