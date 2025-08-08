import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Composant affichant la collection Lifestyle avec les produits VEIL et DRAGON
 */
const LifestyleCollection: React.FC = () => {
  return (
    <div>
      <h3 className="font-semibold text-md uppercase text-gray-800 dark:text-gray-200 mb-6">LIFESTYLE</h3>
      <div className="space-y-6">
        {/* VEIL */}
        <div>
          <Link 
            to="/chamelo-catalog?collection=lifestyle&subCollection=veil"
            className="group"
          >
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 mb-3 overflow-hidden">
              <img 
                src="/images/products/veil.jpg" 
                alt="Veil" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/products/default.jpg';
                }} 
              />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              VEIL
            </p>
          </Link>
        </div>
        
        {/* DRAGON */}
        <div>
          <Link 
            to="/chamelo-catalog?collection=lifestyle&subCollection=dragon"
            className="group"
          >
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 mb-3 overflow-hidden">
              <img 
                src="/images/products/dragon.jpg" 
                alt="Dragon" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/products/default.jpg';
                }} 
              />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              DRAGON
            </p>
          </Link>
        </div>
        
        <Link to="/chamelo-catalog?collection=lifestyle" className="text-xs uppercase hover:underline inline-block">
          See All
        </Link>
      </div>
    </div>
  );
};

export default LifestyleCollection;
