
import { motion } from 'framer-motion';
import { MapPin, Phone, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const OpticiansSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
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
                Trouvez votre opticien
                <span className="block text-blue-600">partenaire Chamelo</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Nos opticiens partenaires sont formés pour vous conseiller et ajuster parfaitement 
                vos lunettes intelligentes Chamelo. Profitez d'un service personnalisé et d'un 
                accompagnement expert.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Plus de 500 opticiens partenaires
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Partout en France
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Prise de rendez-vous en ligne
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Simple et rapide
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Support technique dédié
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Formation et assistance continue
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Prendre rendez-vous
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3"
              >
                Trouver un opticien
                <MapPin className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Image/Carte */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-[400px] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                  {/* Image d'un opticien */}
                  <img
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop"
                    alt="Opticien professionnel"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay avec informations */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Points sur la carte simulés */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                  <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                  <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                  
                  {/* Info card flottante */}
                  <div className="absolute bottom-6 left-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          Optique Moderne
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Paris 15ème • 2.3 km
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
