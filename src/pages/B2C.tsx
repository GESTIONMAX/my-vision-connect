import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Shield, Zap, Smartphone, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PopularProductsShowcase } from '@/components/PopularProductsShowcase';

const B2C = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically handle the form submission,
    // e.g., sending the email to a backend service.
    console.log('Email submitted:', email);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                La révolution des lunettes connectées
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Découvrez une nouvelle façon de voir le monde avec nos lunettes à teinte électronique.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Votre adresse e-mail"
                  className="bg-white text-gray-800 rounded-md py-3 px-4 w-full sm:w-auto"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full sm:w-auto">
                  {submitted ? 'Merci !' : 'Être informé du lancement'}
                </Button>
              </form>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <img
                src="/placeholder.svg" // Replace with your hero image
                alt="Lunettes connectées"
                className="max-w-md rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Pourquoi choisir Chamelo ?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Des fonctionnalités innovantes pour une expérience inégalée.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <FeatureCard
              title="Teinte Électronique Adaptative"
              description="Ajustement automatique de la teinte en fonction de la luminosité ambiante."
              icon={Zap}
            />
            <FeatureCard
              title="Protection UV Maximale"
              description="Protection intégrale contre les rayons UVA et UVB."
              icon={Shield}
            />
            <FeatureCard
              title="Connectivité Smartphone"
              description="Contrôlez vos lunettes via notre application mobile intuitive."
              icon={Smartphone}
            />
            <FeatureCard
              title="Autonomie Longue Durée"
              description="Profitez de vos lunettes toute la journée sans vous soucier de la batterie."
              icon={Award}
            />
            <FeatureCard
              title="Design Ergonomique"
              description="Confort optimal grâce à une conception légère et équilibrée."
              icon={Users}
            />
            <FeatureCard
              title="Garantie Premium"
              description="Garantie de satisfaction et support client dédié."
              icon={Check}
            />
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Nos produits populaires
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Découvrez les modèles les plus appréciés par nos clients.
            </p>
          </motion.div>
          <PopularProductsShowcase products={featuredProducts} />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Prêt à changer votre vision du monde ?
            </h2>
            <p className="text-xl mb-8">
              Inscrivez-vous à notre newsletter pour être informé du lancement et bénéficier d'offres exclusives.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-3">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="bg-white text-gray-800 rounded-md py-3 px-4 w-full sm:w-auto"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full sm:w-auto">
                {submitted ? 'Merci !' : 'Rejoignez-nous'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-700 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Chamelo. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.HTMLAttributes<SVGElement>>;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center mb-4">
      <Icon className="h-6 w-6 text-blue-500 mr-3" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

export default B2C;

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  specifications: Record<string, string>;
  isNew: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockQuantity: number;
  reviewCount: number;
  images: string[];
  features: string[];
  collection: string;
  category: 'classic' | 'sport' | 'pro' | 'femme' | 'homme' | 'lifestyle';
  color: string[];
  usage: 'quotidien' | 'sport' | 'conduite' | 'travail';
  genre?: 'mixte' | 'homme' | 'femme';
  rating: number;
  reviewCount: number;
  originalPrice?: number;
  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;
  original_price?: number;
  is_new: boolean;
  is_popular: boolean;
  is_featured: boolean;
  in_stock: boolean;
  stock_quantity: number;
  review_count: number;
}

const featuredProducts = [
  {
    id: '1',
    name: 'Chamelo Classic',
    slug: 'chamelo-classic',
    description: 'Lunettes connectées à teinte électronique pour un usage quotidien.',
    price: 299,
    originalPrice: 349,
    category: 'classic' as const,
    color: ['noir', 'marron', 'bleu'],
    usage: 'quotidien' as const,
    genre: 'mixte' as const,
    images: ['/placeholder.svg'],
    features: ['Teinte électronique', 'Autonomie 48h'],
    specifications: {},
    isNew: false,
    isPopular: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 10,
    reviewCount: 142,
    rating: 4.8,
    collection: 'lifestyle',
    original_price: 349,
    is_new: false,
    is_popular: true,
    is_featured: true,
    in_stock: true,
    stock_quantity: 10,
    review_count: 142
  },
  {
    id: '2',
    name: 'Chamelo Sport',
    slug: 'chamelo-sport',
    description: 'Lunettes connectées robustes pour les activités sportives.',
    price: 399,
    originalPrice: 449,
    category: 'sport' as const,
    color: ['noir', 'rouge', 'blanc'],
    usage: 'sport' as const,
    genre: 'mixte' as const,
    images: ['/placeholder.svg'],
    features: ['Résistant aux chocs', 'Étanche IP67'],
    specifications: {},
    isNew: false,
    isPopular: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 5,
    reviewCount: 89,
    rating: 4.9,
    collection: 'sport',
    original_price: 449,
    is_new: false,
    is_popular: true,
    is_featured: true,
    in_stock: true,
    stock_quantity: 5,
    review_count: 89
  },
  {
    id: '3',
    name: 'Chamelo Pro',
    slug: 'chamelo-pro',
    description: 'Le summum de la technologie avec IA intégrée.',
    price: 599,
    category: 'pro' as const,
    color: ['noir', 'titane'],
    usage: 'travail' as const,
    genre: 'mixte' as const,
    images: ['/placeholder.svg'],
    features: ['IA intégrée', 'GPS navigation'],
    specifications: {},
    isNew: true,
    isPopular: false,
    isFeatured: true,
    inStock: true,
    stockQuantity: 3,
    reviewCount: 203,
    rating: 5.0,
    collection: 'prismatic',
    original_price: undefined,
    is_new: true,
    is_popular: false,
    is_featured: true,
    in_stock: true,
    stock_quantity: 3,
    review_count: 203
  }
];
