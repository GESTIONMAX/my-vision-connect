import React from 'react';
import { Link } from 'react-router-dom';
import { useCustomCategories } from '@/hooks/useCustomCategories';
import { useChameleoProducts } from '@/hooks/useChameleoProducts';

interface CustomCategoryCollectionProps {
  categoryHandle: string; // Le handle de la catégorie principale (ex: 'sport', 'lifestyle')
  title?: string;         // Un titre optionnel pour remplacer le nom de la catégorie
}

const CustomCategoryCollection: React.FC<CustomCategoryCollectionProps> = ({ 
  categoryHandle, 
  title 
}) => {
  // Récupérer les catégories personnalisées
  const { 
    categories, 
    loading: categoriesLoading, 
    getSubCategoriesByParentHandle,
    error: categoriesError 
  } = useCustomCategories();
  
  // Récupérer les produits pour les associer aux catégories
  const { products, loading: productsLoading, error: productsError } = useChameleoProducts();
  
  // Trouver la catégorie principale par son handle
  const mainCategory = categories.find(cat => cat.handle === categoryHandle);
  
  // Récupérer les sous-catégories
  const subCategories = mainCategory 
    ? getSubCategoriesByParentHandle(categoryHandle) 
    : [];
  
  // Gérer les états de chargement et d'erreur
  if (categoriesLoading || productsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (categoriesError || productsError || !mainCategory) {
    // Fallback pour les erreurs - afficher les composants statiques existants
    return (
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-semibold mb-6">
          {title || categoryHandle.charAt(0).toUpperCase() + categoryHandle.slice(1)}
        </h2>
        <div className="text-red-500 mb-4">
          Impossible de charger les catégories personnalisées. Affichage des données statiques.
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-semibold mb-6">
        {title || mainCategory.name}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subCategories.length > 0 ? (
          subCategories.map((subCategory) => (
            <div key={subCategory.id} className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
              <Link
                to={`/chamelo-catalog?collection=${categoryHandle}&subCollection=${subCategory.handle}`}
                className="block relative"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={subCategory.image_url || '/images/placeholder-product.jpg'}
                    alt={subCategory.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{subCategory.name}</h3>
                  {subCategory.description && (
                    <p className="text-gray-600 text-sm mb-2">{subCategory.description}</p>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-blue-600 font-medium">Voir les produits</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Collection
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-8 text-gray-500">
            Aucune sous-catégorie disponible pour {mainCategory.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCategoryCollection;
