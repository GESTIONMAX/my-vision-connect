
import { motion } from 'framer-motion';
import { TrendingUp, Headphones, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const B2BPartnership = () => {
  const navigate = useNavigate();

  const advantages = [
    {
      icon: TrendingUp,
      title: 'Marge Commerciale Attractive',
      description: 'Jusqu\'à 40% de marge sur notre gamme complète avec des conditions préférentielles pour nos partenaires.',
      highlights: ['Tarifs dégressifs', 'Conditions spéciales', 'Remises volume']
    },
    {
      icon: Headphones,
      title: 'Support Dédié 24/7',
      description: 'Une équipe d\'experts à votre disposition pour vous accompagner dans tous vos projets.',
      highlights: ['Hotline prioritaire', 'Formation équipe', 'Assistance technique']
    },
    {
      icon: Award,
      title: 'PLV et Marketing',
      description: 'Kit complet de présentation et supports marketing fournis gratuitement.',
      highlights: ['Présentoirs offerts', 'Supports de vente', 'Campagnes marketing']
    }
  ];

  const stats = [
    { number: '500+', label: 'Opticiens Partenaires' },
    { number: '100%', label: 'Satisfaction Client' },
    { number: '25', label: 'Pays Couverts' },
    { number: '98%', label: 'Taux de Fidélisation' }
  ];

  const benefits = [
    'Formation technique complète de votre équipe',
    'Certification officielle Chamelo',
    'Accès exclusif aux nouveautés',
    'Support marketing personnalisé',
    'Garantie satisfaction client',
    'Livraison express 24/48h'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Devenir Partenaire
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Rejoignez le réseau d'excellence Chamelo et développez votre activité avec 
              la technologie de demain
            </p>
            <Button 
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              onClick={() => navigate('/b2b')}
            >
              Je souhaite devenir partenaire
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trois Piliers de Notre Partenariat
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Des avantages concrets pour développer votre business
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <advantage.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-4">{advantage.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {advantage.description}
                    </p>
                    <ul className="space-y-2">
                      {advantage.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Avantages Exclusifs Partenaires
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                En rejoignant notre réseau, vous bénéficiez d'un accompagnement complet 
                et d'avantages exclusifs pour maximiser votre succès.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                <Users className="h-16 w-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  Rejoignez une Communauté d'Excellence
                </h3>
                <p className="text-blue-100 mb-6">
                  Faites partie d'un réseau de professionnels passionnés par l'innovation 
                  et l'excellence dans l'optique connectée.
                </p>
                <Button 
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50"
                  onClick={() => navigate('/b2b')}
                >
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à Transformer Votre Activité ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Rejoignez dès maintenant notre réseau de partenaires et bénéficiez 
              de tous les avantages d'un partenariat avec Chamelo.
            </p>
            <Button 
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 px-12 py-4 text-lg font-semibold"
              onClick={() => navigate('/b2b')}
            >
              Je souhaite devenir partenaire
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default B2BPartnership;
