
import { motion } from 'framer-motion';
import { Download, FileText, Package, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const B2BCatalog = () => {
  const products = [
    {
      id: 1,
      name: 'Chamelo Sport Pro',
      image: '/placeholder.svg',
      ref: 'CSP-001',
      category: 'Sport',
      description: 'Lunettes connectées pour sportifs professionnels',
      features: ['Écran OLED', 'GPS intégré', 'Étanche IP67'],
    },
    {
      id: 2,
      name: 'Chamelo Tech Business',
      image: '/placeholder.svg',
      ref: 'CTB-002',
      category: 'Business',
      description: 'Solution professionnelle pour entreprises',
      features: ['Réalité augmentée', 'Notifications', 'Autonomie 12h'],
    },
    {
      id: 3,
      name: 'Chamelo Lifestyle',
      image: '/placeholder.svg',
      ref: 'CL-003',
      category: 'Lifestyle',
      description: 'Design élégant pour usage quotidien',
      features: ['Ultra-léger', 'Bluetooth 5.0', 'Design italien'],
    },
    {
      id: 4,
      name: 'Chamelo Vision Plus',
      image: '/placeholder.svg',
      ref: 'CVP-004',
      category: 'Premium',
      description: 'Technologie avancée de correction visuelle',
      features: ['IA adaptative', 'Verres photochromiques', 'Contrôle vocal'],
    },
  ];

  const catalogs = [
    {
      title: 'Catalogue général 2024',
      description: 'Toute la gamme Chamelo avec tarifs préférentiels',
      size: '2.4 MB',
      pages: 48,
    },
    {
      title: 'Guide technique',
      description: 'Spécifications et installation des produits',
      size: '1.8 MB',
      pages: 32,
    },
    {
      title: 'Fiches produits détaillées',
      description: 'Documentation technique complète',
      size: '3.2 MB',
      pages: 64,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Catalogue Professionnel Chamelo
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Découvrez notre gamme complète avec tarifs et conditions réservés aux opticiens partenaires
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <Star className="h-5 w-5 mr-2" />
                <span>Marges jusqu'à 40%</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <Package className="h-5 w-5 mr-2" />
                <span>Livraison 24/48h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Notre Gamme Professionnelle
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Produits sélectionnés pour votre clientèle exigeante
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="p-0">
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-lg flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {product.ref}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {product.description}
                    </p>
                    <ul className="space-y-1 mb-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 space-y-2">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Demander un devis
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Fiche produit
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogs Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Documentation Professionnelle
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Téléchargez nos catalogues et guides techniques
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {catalogs.map((catalog, index) => (
              <motion.div
                key={catalog.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">{catalog.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {catalog.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <span>{catalog.pages} pages</span>
                      <span>•</span>
                      <span>{catalog.size}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full group-hover:bg-blue-600 transition-colors">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger PDF
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default B2BCatalog;
