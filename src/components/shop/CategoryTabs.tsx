
import { Button } from '@/components/ui/button';
import { useCollections } from '@/hooks/useCollections';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  const { data: collections = [] } = useCollections();

  const staticCategories = [
    { id: 'all', label: 'ALL' },
    { id: 'best-sellers', label: 'BEST SELLERS' },
  ];

  // Combine static categories with dynamic collections
  const allCategories = [
    ...staticCategories,
    ...collections.map(collection => ({
      id: collection.slug,
      label: collection.name.toUpperCase()
    }))
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {allCategories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className={`
            px-6 py-2 font-medium text-sm
            ${selectedCategory === category.id 
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300'
            }
          `}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};
