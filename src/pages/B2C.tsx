
import { HeroSection } from '@/components/HeroSection';
import { motion } from 'framer-motion';
import { Zap, Shield, Smartphone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const B2C = () => {
  const features = [
    {
      icon: Zap,
      title: 'Adaptation Instantanée',
      description: 'Teinte électronique qui s\'adapte automatiquement à la luminosité en 0.3 secondes.',
    },
    {
      icon: Shield,
      title: 'Protection Totale',
      description: 'Protection UV 100% et filtrage de la lumière bleue pour vos yeux.',
    },
    {
      icon: Smartphone,
      title: 'Connectivité Smart',
      description: 'Synchronisation avec votre smartphone via notre application dédiée.',
    },
  ];

  const products = [
    {
      id: 1,
      name: 'NeoShades Classic',
      price: '299€',
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 142,
      features: ['Teinte électronique', 'Autonomie 48h', 'Design classique'],
    },
    {
      id: 2,
      name: 'NeoShades Sport',
      price: '399€',
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 89,
      features: ['Résistant aux chocs', 'Étanche IP67', 'Monture légère'],
    },
    {
      id: 3,
      name: 'NeoShades Pro',
      price: '599€',
      image: '/placeholder.svg',
      rating: 5.0,
      reviews: 203,
      features: ['AI intégrée', 'GPS navigation', 'Appels mains libres'],
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection isB2B={false} />
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technologie Révolutionnaire
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Nos lunettes connectées intègrent les dernières innovations pour une expérience visuelle inégalée
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Notre Collection
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez nos modèles de lunettes connectées, chacun conçu pour répondre à vos besoins spécifiques
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                      {product.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {product.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      ({product.reviews} avis)
                    </span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                    Ajouter au Panier
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default B2C;
