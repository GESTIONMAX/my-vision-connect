
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Eye, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

const B2C = () => {
  // Sélectionner quelques produits featured pour la page B2C
  const featuredProducts = products.filter(product => 
    product.isPopular || product.isNew
  ).slice(0, 4);

  const benefits = [
    {
      icon: Eye,
      title: "Confort visuel optimal",
      description: "Adaptation instantanée à tous les environnements lumineux pour un confort visuel parfait."
    },
    {
      icon: Zap,
      title: "Réactivité instantanée",
      description: "Changement de teinte en moins de 0.1 seconde grâce à notre technologie exclusive."
    },
    {
      icon: Shield,
      title: "Protection maximale",
      description: "Protection UV400 et polarisation intégrée pour vos yeux en toutes circonstances."
    },
    {
      icon: Smartphone,
      title: "Contrôle tactile",
      description: "Ajustement facile et discret avec le touchpad latéral intégré."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Révolutionnez votre <span className="text-yellow-300">vision</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              Les lunettes connectées Chamelo s'adaptent instantanément à votre environnement lumineux pour un confort visuel inégalé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Link to="/products" className="flex items-center gap-2">
                  Découvrir la collection
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <Link to="/technology">
                  Comment ça marche ?
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Pourquoi choisir Chamelo ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Une technologie révolutionnaire qui transforme votre expérience visuelle au quotidien.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits Featured */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Nos modèles populaires
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez notre sélection de lunettes connectées les plus appréciées par nos clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/products">
                Voir toute la collection
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Prêt à révolutionner votre vision ?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Rejoignez les milliers d'utilisateurs qui ont déjà adopté la technologie Chamelo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/products">
                  Commander maintenant
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Essayer en magasin
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default B2C;
