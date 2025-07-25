
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/hooks/useCollections';
import { useSubCollections } from '@/hooks/useSubCollections';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

interface CategoryWithSubCollections {
  id: string;
  label: string;
  subCollections?: Array<{
    slug: string;
    name: string;
    description: string | null;
  }>;
}

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  const navigate = useNavigate();
  const { data: collections = [], isLoading } = useCollections();
  const { data: allSubCollections = [] } = useSubCollections();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Mapping des catégories vers les collections personnalisées
  const customCollectionMapping: { [key: string]: string[] } = {
    'sport': ['shields', 'music-shield'],
    'lifestyle': ['veil', 'dragon'],
    'prismatic': ['euphoria', 'auria']
  };

  const staticCategories: CategoryWithSubCollections[] = [
    { id: 'all', label: 'Tous les produits' },
    { id: 'best-sellers', label: 'Meilleures ventes' },
  ];

  // Ajouter les catégories principales avec navigation vers les collections personnalisées
  const customCategories: CategoryWithSubCollections[] = [
    { 
      id: 'sport', 
      label: 'Sport',
      subCollections: [
        { slug: 'shields', name: 'Lunettes SHields', description: 'Protection maximale pour les sports extrêmes' },
        { slug: 'music-shield', name: 'Lunettes Music Shield', description: 'L\'audio intégré pour votre performance' }
      ]
    },
    { 
      id: 'lifestyle', 
      label: 'Lifestyle',
      subCollections: [
        { slug: 'veil', name: 'Lunettes Veil', description: 'Élégance et discrétion au quotidien' },
        { slug: 'dragon', name: 'Lunettes Dragon', description: 'Style audacieux et connectivité avancée' }
      ]
    },
    { 
      id: 'prismatic', 
      label: 'Prismatic',
      subCollections: [
        { slug: 'euphoria', name: 'Lunettes Euphoria', description: 'Réalité augmentée et expérience immersive' },
        { slug: 'auria', name: 'Lunettes Auria', description: 'Technologie prismatique révolutionnaire' }
      ]
    }
  ];

  const mainCategories: CategoryWithSubCollections[] = collections.map(collection => ({
    id: collection.slug,
    label: collection.name,
    subCollections: allSubCollections
      .filter(sub => sub.parent_collection_slug === collection.slug)
      .map(sub => ({
        slug: sub.slug,
        name: sub.name,
        description: sub.description
      }))
  }));

  // Éviter les doublons entre customCategories et mainCategories
  const mainCategoryIds = mainCategories.map(cat => cat.id);
  const filteredCustomCategories = customCategories.filter(cat => !mainCategoryIds.includes(cat.id));
  
  const allCategories = [...staticCategories, ...filteredCustomCategories, ...mainCategories];

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
                         } group`}
                         onClick={() => {
                           // Navigation vers la page de détail de la collection
                           navigate(`/collection/${subCollection.slug}`);
                           setExpandedCategory(null);
                         }}
                       >
                         <div className="flex items-center justify-between">
                           <div>
                             <div className="font-medium flex items-center gap-2">
                               {subCollection.name}
                               <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <div className="text-xs text-gray-500 dark:text-gray-400">
                               {subCollection.description}
                             </div>
                           </div>
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
