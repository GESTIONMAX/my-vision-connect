import React from 'react';
import { Button } from './button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  // Générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pages: number[] = [];
    
    // Toujours afficher la première page
    pages.push(1);
    
    // Ajouter les pages autour de la page actuelle
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    
    // Toujours afficher la dernière page si elle existe et est différente de la première
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    // Ajouter des ellipsis pour les sauts de pages
    return pages.reduce<(number | string)[]>((acc, page, index, array) => {
      acc.push(page);
      
      // Ajouter des ellipsis si nécessaire
      if (index < array.length - 1 && array[index + 1] - page > 1) {
        acc.push('...');
      }
      
      return acc;
    }, []);
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Bouton précédent */}
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2"
      >
        &lt;
      </Button>
      
      {/* Numéros de page */}
      {pageNumbers.map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2">...</span>
        ) : (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(Number(page))}
            className="px-3"
          >
            {page}
          </Button>
        )
      ))}
      
      {/* Bouton suivant */}
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2"
      >
        &gt;
      </Button>
    </div>
  );
};
