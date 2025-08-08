
import { Button } from '@/components/ui/button';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

interface Category {
  id: string;
  label: string;
}

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  
  // 4 collections principales comme dans l'image de référence
  const categories: Category[] = [
    { id: 'best-sellers', label: 'BEST SELLERS' },
    { id: 'sport', label: 'SPORT' },
    { id: 'lifestyle', label: 'LIFESTYLE' },
    { id: 'prismatic', label: 'PRISMATIC™' }
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div className="overflow-x-auto">
        <nav className="-mb-px flex space-x-0">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className={`whitespace-nowrap py-3 px-6 border-b-2 font-medium text-sm transition-colors ${
                selectedCategory === category.id
                  ? 'border-primary text-primary bg-background'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};
