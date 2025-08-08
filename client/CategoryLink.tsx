import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryLinkProps {
  name: string;
  slug: string;
  className?: string;
}

/**
 * Composant partagé pour les liens de catégories dans le header
 * Permet une navigation directe vers le catalogue filtré par catégorie
 */
const CategoryLink: React.FC<CategoryLinkProps> = ({ name, slug, className = '' }) => {
  return (
    <Link
      to={`/chamelo-catalog?collection=${slug}`}
      className={`font-medium transition-colors duration-200 hover:text-blue-700 dark:hover:text-blue-300 ${className}`}
    >
      {name}
    </Link>
  );
};

export default CategoryLink;
