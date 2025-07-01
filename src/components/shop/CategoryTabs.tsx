
import { Button } from '@/components/ui/button';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  const categories = [
    { id: 'all', label: 'ALL' },
    { id: 'best-sellers', label: 'BEST SELLERS' },
    { id: 'sport', label: 'SPORT' },
    { id: 'lifestyle', label: 'LIFESTYLE' },
    { id: 'prismatic', label: 'PRISMATIC™' },
    { id: 'bundles', label: 'CHAMELO BUNDLES' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
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
