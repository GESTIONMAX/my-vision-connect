
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Instagram, Twitter } from 'lucide-react';

export const CreatorSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image du créateur */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop"
                alt="Stephen Harbory - Designer"
                className="w-full h-[600px] object-cover"
              />
              {/* Badge collaboration */}
              <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-white font-medium">Limited Edition</span>
              </div>
            </div>
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                By Stephen Harbory
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                Une collaboration exclusive avec le designer visionnaire Stephen Harbory, 
                créateur de lunettes iconiques pour les plus grandes maisons de mode.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Design révolutionnaire
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                "J'ai voulu créer une paire qui transcende la frontière entre technologie 
                et élégance. Chaque courbe, chaque détail a été pensé pour sublimer le visage 
                tout en intégrant l'innovation Chamelo de manière invisible."
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Édition limitée
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seulement 500 exemplaires numérotés disponibles dans le monde entier. 
                Chaque paire est accompagnée d'un certificat d'authenticité signé par l'artiste.
              </p>
            </div>

            {/* Réseaux sociaux du créateur */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-gray-600 dark:text-gray-300">Suivez Stephen :</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Découvrir la collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
