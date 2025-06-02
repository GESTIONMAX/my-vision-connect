
import { motion } from 'framer-motion';

export const SocialProofSection = () => {
  const partners = [
    { name: "Essilor", logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=100&fit=crop" },
    { name: "Zeiss", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop" },
    { name: "Luxottica", logo: "https://images.unsplash.com/photo-1560472355-a9a6b68c1e5b?w=200&h=100&fit=crop" },
    { name: "Transitions", logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=100&fit=crop" },
    { name: "Optics Pro", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop" },
  ];

  const stats = [
    { number: "50K+", label: "Clients satisfaits" },
    { number: "98%", label: "Taux de satisfaction" },
    { number: "24h", label: "Support technique" },
    { number: "15+", label: "Années d'expérience" },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Plus de 500 opticiens partenaires dans le monde entier
          </p>
        </motion.div>

        {/* Logos partenaires */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center mb-16"
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
