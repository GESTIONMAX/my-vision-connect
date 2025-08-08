
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Zap, 
  Eye, 
  Shield, 
  Smartphone, 
  Battery, 
  Car, 
  Mountain, 
  Building,
  Clock,
  Droplets,
  Sun,
  CheckCircle,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Technology = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const advantages = [
    {
      icon: Eye,
      title: "Confort Visuel Constant",
      description: "Adaptation instantanée à tout changement lumineux pour un confort optimal"
    },
    {
      icon: Shield,
      title: "Protection UV400",
      description: "Protection maximale contre les rayons UV avec polarisation intégrée"
    },
    {
      icon: Zap,
      title: "Réactivité Instantanée",
      description: "Changement de teinte en moins de 0.1 seconde"
    },
    {
      icon: Droplets,
      title: "Étanchéité IPX4",
      description: "Résistance aux projections d'eau et à la transpiration"
    }
  ];

  const useCases = [
    {
      icon: Car,
      title: "Conduite",
      description: "Adaptation instantanée en sortie de tunnel ou sous les ponts",
      scenario: "Plus de temps d'adaptation, vision claire immédiate"
    },
    {
      icon: Mountain,
      title: "Sport & Outdoor",
      description: "Performance optimale lors de changements lumineux rapides",
      scenario: "Trail, ski, cyclisme : toujours la bonne teinte"
    },
    {
      icon: Building,
      title: "Quotidien Urbain",
      description: "Style et performance pour tous vos déplacements en ville",
      scenario: "Bureau, terrasse, transports : un seul équipement"
    }
  ];

  const comparisonData = [
    {
      feature: "Temps de réaction",
      standard: "Non applicable",
      photochromique: "30 sec - 5 min",
      chamelo: "< 0.1 sec"
    },
    {
      feature: "Contrôle manuel",
      standard: "Non",
      photochromique: "Non",
      chamelo: "Oui"
    },
    {
      feature: "Niveaux de teinte",
      standard: "1 fixe",
      photochromique: "Variable auto",
      chamelo: "3 niveaux réglables"
    },
    {
      feature: "Fonctionnement intérieur",
      standard: "Limité",
      photochromique: "Non",
      chamelo: "Parfait"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              La lumière change.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Vos lunettes aussi.
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Découvrez la révolution des lunettes intelligentes à teinte électronique. 
              Une innovation optique qui s'adapte instantanément à votre environnement.
            </p>
            <Button size="lg" asChild>
              <Link to="/products">Découvrir la Collection</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Innovation Chamelo */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technologie Chamelo
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Des verres à cristaux liquides révolutionnaires qui redéfinissent l'expérience optique
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4">Innovation Technique</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Réactivité Instantanée</h3>
                      <p className="text-gray-600 dark:text-gray-300">Changement de teinte en moins de 0.1 seconde</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Contrôle Tactile</h3>
                      <p className="text-gray-600 dark:text-gray-300">Touchpad latéral pour ajustement sans interruption</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Battery className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Autonomie Optimisée</h3>
                      <p className="text-gray-600 dark:text-gray-300">7 à 10 jours d'utilisation par charge</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">3 Niveaux de Teinte</Badge>
                      <Badge variant="secondary">Cristaux Liquides</Badge>
                      <Badge variant="secondary">USB-C</Badge>
                      <Badge variant="secondary">Recharge Magnétique</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <AspectRatio ratio={4/3}>
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <Eye className="h-12 w-12 text-blue-600" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Schéma technique des verres électroniques</p>
                  </div>
                </div>
              </AspectRatio>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comparaison Technologies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Chamelo vs technologies traditionnelles
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Caractéristique</th>
                      <th className="px-6 py-4 text-center font-semibold">Lunettes Standard</th>
                      <th className="px-6 py-4 text-center font-semibold">Photochromiques</th>
                      <th className="px-6 py-4 text-center font-semibold text-blue-600">Chamelo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">{row.feature}</td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">{row.standard}</td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">{row.photochromique}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-blue-600">{row.chamelo}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Avantages Utilisateurs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Une expérience visuelle révolutionnée
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {advantages.map((advantage, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <advantage.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{advantage.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{advantage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Spécifications Techniques
            </h2>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-12"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <CardHeader>
                  <CardTitle>Composants Électroniques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Processeur</span>
                    <span className="font-semibold">ARM Cortex-M4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capteurs</span>
                    <span className="font-semibold">Luminosité + Gyroscope</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Connectivité</span>
                    <span className="font-semibold">Bluetooth 5.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Batterie</span>
                    <span className="font-semibold">120 mAh Li-Po</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recharge</span>
                    <span className="font-semibold">USB-C Magnétique</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <CardHeader>
                  <CardTitle>Performances & Durabilité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Autonomie</span>
                    <span className="font-semibold">7-10 jours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temps de charge</span>
                    <span className="font-semibold">2 heures</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Étanchéité</span>
                    <span className="font-semibold">IPX4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Poids</span>
                    <span className="font-semibold">28g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Matériaux</span>
                    <span className="font-semibold">Titane & TR90</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cas d'Usage Illustrés
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Une technologie qui s'adapte à votre mode de vie
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {useCases.map((useCase, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                      <useCase.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>{useCase.title}</CardTitle>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                      "{useCase.scenario}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Chamelo : Design, Technologie et Liberté
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Une innovation pensée pour les humains et la lumière. 
              Libérez-vous des contraintes et vivez chaque moment avec la vision parfaite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/products">Voir la Collection</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link to="/contact">Nous Contacter</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Technology;
