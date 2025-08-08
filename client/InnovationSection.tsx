
import { motion } from 'framer-motion';
import { Zap, Shield, Smartphone, Battery } from 'lucide-react';

export const InnovationSection = () => {
  const innovations = [
    {
      icon: Zap,
      title: "Technologie LC",
      description: "Cristaux liquides révolutionnaires pour une transition instantanée"
    },
    {
      icon: Shield,
      title: "Protection UV+",
      description: "Filtrage adaptatif jusqu'à 99.9% des rayons nocifs"
    },
    {
      icon: Smartphone,
      title: "App Connected",
      description: "Contrôle intelligent et personnalisation avancée"
    },
    {
      icon: Battery,
      title: "Autonomie Pro",
      description: "Jusqu'à 72h d'autonomie avec charge rapide 15min"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contenu texte */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Innovation qui change
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  la vision du monde
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Nos verres à teinte électronique représentent 5 années de R&D intensive. 
                Une révolution technologique qui s'adapte à votre environnement en temps réel.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {innovations.map((innovation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <innovation.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {innovation.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {innovation.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visualisation produit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Image principale */}
              <img
                src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=500&fit=crop"
                alt="Innovation Chamelo"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              
              {/* Éléments flottants informatifs */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">0.3s</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Transition</div>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">99.9%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Protection UV</div>
                </div>
              </div>
              
              {/* Effet de lueur */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
