import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ProductCategoryFiltersProps {
  className?: string;
}

const ProductCategoryFilters: React.FC<ProductCategoryFiltersProps> = ({ className = '' }) => {
  const location = useLocation();
  const currentCollection = new URLSearchParams(location.search).get('collection');

  const categories = [
    { name: 'Meilleures ventes', param: 'bestsellers' },
    { name: 'Sport', param: 'sport-lunettes-sport' },
    { name: 'Lifestyle', param: 'sport-lifestyle' },
    { name: 'Prismatic', param: 'sport-prismatic' },
  ];

  return (
    <nav className={`mb-8 ${className}`}>
      <ul className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <li key={category.param}>
            <Link
              to={`/chamelo-catalog?collection=${category.param}`}
              className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200 
                ${currentCollection === category.param 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProductCategoryFilters;
