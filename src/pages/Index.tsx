
import { HeroSection } from '@/components/HeroSection';
import { CollectionsSection } from '@/components/CollectionsSection';
import { CollectionsShowcase } from '@/components/CollectionsShowcase';
import { PopularProductsSection } from '@/components/PopularProductsSection';
import { PopularProductsShowcase } from '@/components/PopularProductsShowcase';
import { InnovationSection } from '@/components/InnovationSection';
import { LifestyleSection } from '@/components/LifestyleSection';
import { OpticiansSection } from '@/components/OpticiansSection';
import { PartnerSection } from '@/components/PartnerSection';
import { FAQSection } from '@/components/FAQSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero section avec image plein écran + bouton "Découvrir la collection" */}
      <HeroSection />
      
      {/* 2. Section 3 collections phares (affichage en 3 colonnes) */}
      <CollectionsSection />
      
      {/* 2bis. Nouvelle section collections showcase */}
      <CollectionsShowcase />
      
      {/* 3. Section produits populaires (3 à 6 best-sellers en grille) */}
      <PopularProductsSection />
      
      {/* 3bis. Nouvelle section produits populaires showcase */}
      <PopularProductsShowcase />
      
      {/* 4. Bloc innovation (zoom sur technologie ou qualité des verres) */}
      <InnovationSection />
      
      {/* 5. Bloc témoignages ou photos lifestyle (slider simple) */}
      <LifestyleSection />
      
      {/* 6. Bloc opticiens : message d'appel + bouton "Prendre rendez-vous" */}
      <OpticiansSection />
      
      {/* 6bis. Section partenaire B2B */}
      <PartnerSection />
      
      {/* 7. FAQ (accordéon) */}
      <FAQSection />
    </div>
  );
};

export default Index;
