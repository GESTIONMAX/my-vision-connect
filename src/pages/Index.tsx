
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Building2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SupabaseConnectionTest } from '@/components/SupabaseConnectionTest';

const Index = () => {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    hover: { 
      y: -10,
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const options = [
    {
      title: "Je suis un particulier",
      description: "Découvrez notre collection de lunettes connectées pour usage personnel",
      icon: User,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      action: () => navigate('/b2c'),
      features: ["Catalogue grand public", "Achat en ligne", "Garantie 2 ans"]
    },
    {
      title: "Je suis un professionnel",
      description: "Rejoignez notre réseau de partenaires opticiens avec des solutions dédiées",
      icon: Building2,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      action: () => navigate('/b2b'),
      features: ["Tarifs préférentiels", "Formation technique", "Support 24/7"]
    },
    {
      title: "Voir le catalogue",
      description: "Explorez directement notre gamme complète de lunettes connectées",
      icon: ShoppingBag,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      action: () => navigate('/products'),
      features: ["Tous les produits", "Filtres avancés", "Comparaison"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Bienvenue chez{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EuroGlobal
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            L'avenir de la vision intelligente commence ici. 
            Choisissez votre parcours pour découvrir nos lunettes connectées.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={option.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${option.bgGradient} p-8 cursor-pointer border ${option.borderColor} shadow-lg hover:shadow-xl transition-shadow duration-300`}
              onClick={option.action}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {option.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {option.description}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className={`w-2 h-2 bg-gradient-to-r ${option.gradient} rounded-full mr-3`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className={`w-full bg-gradient-to-r ${option.gradient} hover:from-opacity-90 hover:to-opacity-90 text-white group-hover:shadow-lg transition-all duration-300`}>
                  Commencer
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Vous pouvez toujours changer de parcours à tout moment
          </p>
        </motion.div>
        
        {/* Composant de test de connexion à Supabase - À retirer après validation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16"
        >
          <SupabaseConnectionTest />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
