import React from 'react';
import { Button } from '../ui/button';

export const HeroSection = () => {
  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/shop-hero.jpg" // Remplacez par le chemin de votre image
          alt="Lunettes de sport et de protection"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>
      
      {/* Contenu du héros */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Découvrez nos lunettes de sport haut de gamme
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Conçues pour les sportifs exigeants, nos lunettes allient performance, style et protection optimale.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-medium">
              Découvrir la collection
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium">
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
