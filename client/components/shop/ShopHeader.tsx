import React from 'react';

interface ShopHeaderProps {
  title: string;
  breadcrumbs?: { label: string; url?: string }[];
  promotionalText?: string;
  className?: string;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({
  title,
  breadcrumbs = [],
  promotionalText,
  className = ''
}) => {
  return (
    <div className={className}>
      {/* Fil d'ariane */}
      {breadcrumbs.length > 0 && (
        <nav className="text-sm text-gray-600 mb-4">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="mx-2">/</span>}
              {item.url ? (
                <a href={item.url} className="hover:text-blue-600">
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      
      {/* Titre principal */}
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      
      {/* Bannière promotionnelle */}
      {promotionalText && (
        <div className="bg-yellow-400 text-center p-2 rounded-sm text-sm font-medium mt-2 mb-6">
          {promotionalText}
        </div>
      )}
    </div>
  );
};
