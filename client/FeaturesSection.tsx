
import { motion } from 'framer-motion';
import { Smartphone, Battery, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Adaptation Ultra-Rapide",
      description: "Transition en 0.3 secondes entre les différents niveaux de luminosité",
      details: "Grâce à notre technologie électronique avancée, nos verres s'adaptent instantanément à votre environnement.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop"
    },
    {
      icon: Battery,
      title: "Autonomie Exceptionnelle",
      description: "48 heures d'utilisation continue avec une seule charge",
      details: "Batterie haute performance intégrée discrètement dans la monture pour une autonomie prolongée.",
      image: "https://images.unsplash.com/photo-1585171247042-c50c8b816b8c?w=500&h=300&fit=crop"
    },
    {
      icon: Shield,
      title: "Protection Totale",
      description: "100% anti-UV et filtre anti-lumière bleue intelligent",
      details: "Protection optimale contre tous les types de rayonnements nocifs, adaptée selon l'intensité détectée.",
      image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&h=300&fit=crop"
    },
    {
      icon: Smartphone,
      title: "Contrôle Intelligent",
      description: "Application mobile pour personnaliser vos préférences",
      details: "Ajustez vos réglages, consultez l'autonomie et recevez des conseils personnalisés.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Fonctionnalités révolutionnaires
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez les technologies qui font de nos lunettes les plus avancées du marché
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.details}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
