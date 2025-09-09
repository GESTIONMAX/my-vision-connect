
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingIcons } from '@/components/hero/FloatingIcons';
import { HeroStats } from '@/components/hero/HeroStats';
import { HeroCarousel } from '@/components/hero/HeroCarousel';
import { HeroVideo } from '@/components/hero/HeroVideo';
import { FloatingElements } from '@/components/hero/FloatingElements';

interface HeroSectionProps {
  isB2B?: boolean;
}

export const HeroSection = ({ isB2B = false }: HeroSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-6xl mx-auto"
        >
          {/* Icônes flottantes innovantes */}
          <motion.div variants={itemVariants}>
            <FloatingIcons />
          </motion.div>

          {/* Texture décorative */}
          <motion.div variants={itemVariants} className="mb-4">
            <div className="relative mx-auto w-32 h-8">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"></div>
              <div 
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='8' viewBox='0 0 40 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 4c10 0 10-4 20-4s10 4 20 4' stroke='%23ddd6fe' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`
                }}
              ></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
              {isB2B ? '🤝 Solutions Professionnelles' : '🚀 Innovation Technologique'}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            {isB2B ? (
              <>
                Partenaire de votre
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Réussite Professionnelle
                </span>
              </>
            ) : (
              <>
                L'avenir des lunettes
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  intelligentes
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {isB2B
              ? "Rejoignez le réseau d'opticiens partenaires EUROGLOBAL et proposez à vos clients les dernières innovations en lunettes connectées."
              : "Découvrez nos lunettes à teinte électronique révolutionnaires qui s'adaptent automatiquement à votre environnement pour un confort visuel optimal."}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isB2B ? 'Devenir Partenaire' : 'Découvrir la Collection'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Slider d'images */}
          <HeroCarousel isB2B={isB2B} />

          {/* Vidéo intégrée */}
          <HeroVideo />

          {/* Statistics */}
          <HeroStats isB2B={isB2B} />
        </motion.div>
      </div>

      {/* Floating Elements */}
      <FloatingElements />
    </section>
  );
};
