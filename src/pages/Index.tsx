
import { HeroSection } from '@/components/HeroSection';
import { CollectionsSection } from '@/components/CollectionsSection';
import { PopularProductsSection } from '@/components/PopularProductsSection';
import { InnovationSection } from '@/components/InnovationSection';
import { LifestyleSection } from '@/components/LifestyleSection';
import { OpticiansSection } from '@/components/OpticiansSection';
import { FAQSection } from '@/components/FAQSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero section avec image plein écran + bouton "Découvrir la collection" */}
      <HeroSection />
      
      {/* 2. Section 3 collections phares (affichage en 3 colonnes) */}
      <CollectionsSection />
      
      {/* 3. Section produits populaires (3 à 6 best-sellers en grille) */}
      <PopularProductsSection />
      
      {/* 4. Bloc innovation (zoom sur technologie ou qualité des verres) */}
      <InnovationSection />
      
      {/* 5. Bloc témoignages ou photos lifestyle (slider simple) */}
      <LifestyleSection />
      
      {/* 6. Bloc opticiens : message d'appel + bouton "Prendre rendez-vous" */}
      <OpticiansSection />
      
      {/* 7. FAQ (accordéon) */}
      <FAQSection />
    </div>
  );
};

export default Index;
