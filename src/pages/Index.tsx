
import { HeroSection } from '@/components/HeroSection';
import { CollectionsSection } from '@/components/CollectionsSection';
import { LifestyleSection } from '@/components/LifestyleSection';
import { CreatorSection } from '@/components/CreatorSection';
import { SocialProofSection } from '@/components/SocialProofSection';
import { InnovationSection } from '@/components/InnovationSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ProblemSolutionSection } from '@/components/ProblemSolutionSection';
import { CTASection } from '@/components/CTASection';
import { UserTypeSelector } from '@/components/UserTypeSelector';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Header + Hero avec accroche visuelle */}
      <HeroSection />
      
      {/* 2. Collections - Shop by collection */}
      <CollectionsSection />
      
      {/* 3. Lifestyle - Looks en situation */}
      <LifestyleSection />
      
      {/* 4. Créateur/Collaboration - Storytelling */}
      <CreatorSection />
      
      {/* 5. Social proof - Partenaires */}
      <SocialProofSection />
      
      {/* 6. Innovation produit - Techno détaillée */}
      <InnovationSection />
      
      {/* 7. Fonctionnalités complémentaires */}
      <FeaturesSection />
      
      {/* 8. Témoignages clients */}
      <TestimonialsSection />
      
      {/* 9. Solution aux problèmes */}
      <ProblemSolutionSection />
      
      {/* 10. CTA final */}
      <CTASection />
      
      {/* 11. Sélecteur de type d'utilisateur */}
      <UserTypeSelector />
    </div>
  );
};

export default Index;
