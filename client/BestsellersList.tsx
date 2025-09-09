import React from 'react';
import { useBestsellers } from '@/hooks/useBestsellers';
import { ProductCard } from '@/components/ProductCard';
import { Loader2 } from 'lucide-react';

interface BestsellersListProps {
  title?: string;
  maxItems?: number;
  className?: string;
}

/**
 * Composant qui affiche les produits bestsellers
 */
export const BestsellersList: React.FC<BestsellersListProps> = ({
  title = 'Meilleures ventes',
  maxItems = 4,
  className = '',
}) => {
  const { data: bestsellers, isLoading, error } = useBestsellers();
  
  // Limiter le nombre de produits affichés
  const displayedBestsellers = bestsellers?.slice(0, maxItems) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    console.error('Erreur lors du chargement des meilleures ventes:', error);
    return null;
  }

  if (!displayedBestsellers.length) {
    return null;
  }

  return (
    <div className={`bestsellers-container ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="inline-block w-3 h-3 bg-orange-500 mr-3 rounded-full"></span>
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedBestsellers.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            badge={<span className="bg-orange-500 text-white text-xs px-2 py-1 rounded absolute top-3 left-3">BESTSELLER</span>}
          />
        ))}
      </div>
    </div>
  );
};

export default BestsellersList;
