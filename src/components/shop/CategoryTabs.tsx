
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  const categories = [
    { id: 'all', label: 'Tous les produits' },
    { id: 'smart-glasses', label: 'Lunettes Connectées' },
    { id: 'electronic-tint', label: 'Teinte Électronique' },
    { id: 'accessories', label: 'Accessoires' },
  ];

  return (
    <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
