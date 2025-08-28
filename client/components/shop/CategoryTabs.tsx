import React from 'react';

interface Category {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  className?: string;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  className = ''
}) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <ul className="flex overflow-x-auto space-x-8 px-1">
        {categories.map((category) => (
          <li 
            key={category.id} 
            className="pb-4 cursor-pointer"
            onClick={() => onSelectCategory(category.id)}
          >
            <div 
              className={`text-sm font-medium ${
                activeCategory === category.id 
                ? 'text-blue-600 border-b-2 border-blue-600 -mb-px' 
                : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              {category.label}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
