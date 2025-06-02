
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PartnerSection = () => {
  const advantages = [
    {
      icon: TrendingUp,
      title: "Marges attractives",
      description: "Jusqu'à 40% de marge sur notre gamme complète"
    },
    {
      icon: Truck,
      title: "Livraison rapide",
      description: "Livraison express 24h/48h partout en France"
    },
    {
      icon: Award,
      title: "PLV offerte",
      description: "Kit de présentation et PLV fournis gratuitement"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Vous êtes opticien ou magasin de sport ?
            </h2>
            <p className="text-2xl text-blue-200 mb-8">
              Devenez partenaire d'EUROGLOBAL TRADING DISTRIBUTION distributeur européen pour la marque Chamelo
            </p>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Rejoignez notre réseau de partenaires et proposez à vos clients 
              la révolution des lunettes intelligentes
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
                <advantage.icon className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {advantage.title}
              </h3>
              <p className="text-blue-200">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-white text-blue-900 hover:bg-blue-50 px-12 py-4 text-lg font-semibold"
          >
            Prendre rendez-vous
            <Calendar className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-blue-200 mt-4">
            Discutons de votre projet de partenariat
          </p>
        </motion.div>
      </div>
    </section>
  );
};
