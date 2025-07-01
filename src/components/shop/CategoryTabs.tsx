
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/hooks/useCollections';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  const { data: collections = [], isLoading } = useCollections();

  const staticCategories = [
    { id: 'all', label: 'Tous les produits' },
    { id: 'best-sellers', label: 'Meilleures ventes' },
  ];

  // Combine static categories with dynamic collections
  const allCategories = [
    ...staticCategories,
    ...collections.map(collection => ({
      id: collection.slug,
      label: collection.name
    }))
  ];

  if (isLoading) {
    return (
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <div className="animate-pulse bg-gray-200 h-10 w-32 rounded"></div>
        </nav>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {allCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedCategory === category.id
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};
