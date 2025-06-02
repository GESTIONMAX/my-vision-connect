import { motion } from 'framer-motion';
import { ArrowRight, Zap, Eye, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const floatingIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
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
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center gap-8 mb-8"
          >
            <motion.div
              variants={floatingIconVariants}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Eye className="h-8 w-8 text-white" />
            </motion.div>
            
            <motion.div
              variants={floatingIconVariants}
              animate={{
                y: [0, -15, 0],
                rotate: [0, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl"
            >
              <Zap className="h-10 w-10 text-white" />
            </motion.div>
            
            <motion.div
              variants={floatingIconVariants}
              animate={{
                y: [0, -8, 0],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Smartphone className="h-8 w-8 text-white" />
            </motion.div>
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

          {/* Vidéo intégrée */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/nb1_yCncBzg?si=nb1_yCncBzg&start=18"
                    title="EUROGLOBAL - Démonstration"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {isB2B ? (
              <>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
                  <div className="text-gray-600 dark:text-gray-300">Opticiens Partenaires</div>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">30%</div>
                  <div className="text-gray-600 dark:text-gray-300">Marge Moyenne</div>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
                  <div className="text-gray-600 dark:text-gray-300">Support Technique</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">0.3s</div>
                  <div className="text-gray-600 dark:text-gray-300">Adaptation Instantanée</div>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">48h</div>
                  <div className="text-gray-600 dark:text-gray-300">Autonomie Batterie</div>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
                  <div className="text-gray-600 dark:text-gray-300">Protection UV</div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-xl"
      />
    </section>
  );
};
