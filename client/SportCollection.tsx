import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Composant pour la gamme Sport dans le mega menu
 * Présente les produits SHIELDS et MUSIC FIELDS
 */
const SportCollection: React.FC = () => {
  return (
    <div>
      <h3 className="font-semibold text-md uppercase text-gray-800 dark:text-gray-200 mb-6">SPORT</h3>
      <div className="space-y-6">
        {/* Shield */}
        <div>
          <Link 
            to="/chamelo-catalog?collection=sport&subCollection=shield"
            className="group"
          >
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 mb-3 overflow-hidden">
              <img 
                src="/images/products/shield.jpg" 
                alt="Shield" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/products/default.jpg';
                }} 
              />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Shield
            </p>
          </Link>
        </div>
        
        {/* Music Shield */}
        <div>
          <Link 
            to="/chamelo-catalog?collection=sport&subCollection=music-shield"
            className="group"
          >
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 mb-3 overflow-hidden">
              <img 
                src="/images/products/music-shield.jpg" 
                alt="Music Shield" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/products/default.jpg';
                }} 
              />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Music Shield
            </p>
          </Link>
        </div>
        
        <Link to="/chamelo-catalog?collection=sport" className="text-xs uppercase hover:underline">
          See All
        </Link>
      </div>
    </div>
  );
};

export default SportCollection;
