
import { HeroSection } from '@/components/HeroSection';
import { SocialProofSection } from '@/components/SocialProofSection';
import { ProblemSolutionSection } from '@/components/ProblemSolutionSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { CTASection } from '@/components/CTASection';
import { UserTypeSelector } from '@/components/UserTypeSelector';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SocialProofSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <UserTypeSelector />
    </div>
  );
};

export default Index;
