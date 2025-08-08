import React, { useState, useEffect } from 'react';
import ChameleoProductList from '@/components/ChameleoProductList';
import { ChameleoFilters } from '@/types/chameleo';
import { useLocation, useNavigate } from 'react-router-dom';

const ChameloCatalogPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('all');
  const location = useLocation();
  const navigate = useNavigate();

  // Lire les paramètres d'URL au chargement de la page
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const collectionParam = queryParams.get('collection');
    
    if (collectionParam) {
      setCurrentView(collectionParam);
    } else {
      setCurrentView('all');
    }
  }, [location.search]);

  // Mettre à jour l'URL lorsque currentView change
  const updateView = (view: string) => {
    setCurrentView(view);
    if (view === 'all') {
      navigate('/chamelo-catalog');
    } else {
      navigate(`/chamelo-catalog?collection=${view}`);
    }
  };

  // Définir les filtres en fonction de la vue sélectionnée
  const getFilters = (): ChameleoFilters => {
    if (currentView === 'all') return {};
    return { collection: currentView };
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-8">Catalogue Chamelo</h1>
      
      {/* Navigation entre les catégories */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => updateView('all')}
          className={`px-4 py-2 rounded-full ${
            currentView === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Tous les produits
        </button>
        <button
          onClick={() => updateView('sport-lunettes-sport')}
          className={`px-4 py-2 rounded-full ${
            currentView === 'sport-lunettes-sport' || currentView === 'sport'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Sport
        </button>
        <button
          onClick={() => updateView('sport-lifestyle')}
          className={`px-4 py-2 rounded-full ${
            currentView === 'sport-lifestyle' || currentView === 'lifestyle'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Lifestyle
        </button>
        <button
          onClick={() => updateView('sport-prismatic')}
          className={`px-4 py-2 rounded-full ${
            currentView === 'sport-prismatic' || currentView === 'prismatic'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Prismatic
        </button>
      </div>
      
      {/* Liste des produits avec les filtres appliqués */}
      <ChameleoProductList
        initialFilters={getFilters()}
        title={`Produits ${currentView !== 'all' ? currentView : ''}`}
        showFilters={true}
      />
    </div>
  );
};

export default ChameloCatalogPage;
