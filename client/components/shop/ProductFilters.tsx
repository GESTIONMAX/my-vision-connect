import React from 'react';

type FilterOption = {
  id: string;
  label: string;
  count?: number;
};

interface ProductFiltersProps {
  onFilterChange: (filterType: string, value: string) => void;
  filters: Record<string, string>;
  availableSortOptions: FilterOption[];
  availableCollections: FilterOption[];
  availableColors: FilterOption[];
  availableShapes: FilterOption[];
  availableTechnologies: FilterOption[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  filters,
  availableSortOptions,
  availableCollections,
  availableColors,
  availableShapes,
  availableTechnologies
}) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 min-w-[250px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Filtres (3)</h3>
        <button 
          onClick={() => {
            // Réinitialiser tous les filtres
            Object.keys(filters).forEach(key => {
              onFilterChange(key, 'all');
            });
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          Réinitialiser
        </button>
      </div>

      {/* Tri */}
      <div className="mb-6">
        <h4 className="text-sm font-medium uppercase mb-2">Trier par</h4>
        <div className="space-y-2">
          {availableSortOptions.map(option => (
            <div key={option.id} className="flex items-center">
              <input
                type="radio"
                id={`sort-${option.id}`}
                name="sort"
                value={option.id}
                checked={filters.sort === option.id}
                onChange={() => onFilterChange('sort', option.id)}
                className="mr-2"
              />
              <label htmlFor={`sort-${option.id}`} className="text-sm">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Collections */}
      <div className="mb-6">
        <h4 className="text-sm font-medium uppercase mb-2">Collection</h4>
        <div className="space-y-2">
          {availableCollections.map(collection => (
            <div key={collection.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`collection-${collection.id}`}
                  checked={filters.collection === collection.id}
                  onChange={() => onFilterChange('collection', collection.id === filters.collection ? 'all' : collection.id)}
                  className="mr-2"
                />
                <label htmlFor={`collection-${collection.id}`} className="text-sm">
                  {collection.label}
                </label>
              </div>
              {collection.count !== undefined && (
                <span className="text-xs text-gray-500">({collection.count})</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Couleurs */}
      <div className="mb-6">
        <h4 className="text-sm font-medium uppercase mb-2">Couleur</h4>
        <div className="space-y-2">
          {availableColors.map(color => (
            <div key={color.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`color-${color.id}`}
                  checked={filters.color === color.id}
                  onChange={() => onFilterChange('color', color.id === filters.color ? 'all' : color.id)}
                  className="mr-2"
                />
                <label htmlFor={`color-${color.id}`} className="text-sm">
                  {color.label}
                </label>
              </div>
              {color.count !== undefined && (
                <span className="text-xs text-gray-500">({color.count})</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Formes */}
      <div className="mb-6">
        <h4 className="text-sm font-medium uppercase mb-2">Forme</h4>
        <div className="space-y-2">
          {availableShapes.map(shape => (
            <div key={shape.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`shape-${shape.id}`}
                  checked={filters.shape === shape.id}
                  onChange={() => onFilterChange('shape', shape.id === filters.shape ? 'all' : shape.id)}
                  className="mr-2"
                />
                <label htmlFor={`shape-${shape.id}`} className="text-sm">
                  {shape.label}
                </label>
              </div>
              {shape.count !== undefined && (
                <span className="text-xs text-gray-500">({shape.count})</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Technologies */}
      <div className="mb-6">
        <h4 className="text-sm font-medium uppercase mb-2">Tech</h4>
        <div className="space-y-2">
          {availableTechnologies.map(tech => (
            <div key={tech.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`tech-${tech.id}`}
                  checked={filters.tech === tech.id}
                  onChange={() => onFilterChange('tech', tech.id === filters.tech ? 'all' : tech.id)}
                  className="mr-2"
                />
                <label htmlFor={`tech-${tech.id}`} className="text-sm">
                  {tech.label}
                </label>
              </div>
              {tech.count !== undefined && (
                <span className="text-xs text-gray-500">({tech.count})</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
