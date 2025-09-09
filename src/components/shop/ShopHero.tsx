import { Link } from 'react-router-dom';

export const ShopHero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 min-h-[500px] w-full border-4 border-red-500">
      {/* Contenu du héros */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center py-24 px-4 sm:px-6 lg:px-8 border-4 border-green-500">
        <div className="max-w-2xl text-white border-4 border-yellow-500 p-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl border-2 border-pink-500 p-2">
            Découvrez nos lunettes connectées
          </h1>
          <p className="mt-6 text-xl max-w-2xl border-2 border-purple-500 p-2">
            La technologie au service de votre confort visuel. Des lunettes intelligentes qui s'adaptent à votre environnement.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 border-2 border-blue-300 p-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-800 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              Acheter maintenant
            </Link>
            <Link
              to="/collections"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:bg-opacity-10 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              Découvrir les collections
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
