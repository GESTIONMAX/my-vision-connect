
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const CollectionsShowcase = () => {
  const collections = [
    {
      id: 1,
      name: "Sport Collection",
      description: "Conçues pour les athlètes et les aventuriers. Résistantes, légères et performantes.",
      image: "https://images.unsplash.com/photo-1583743089695-4b1ced180bb4?w=600&h=400&fit=crop",
      link: "/collections/sport"
    },
    {
      id: 2,
      name: "Tech Collection",
      description: "L'innovation à son apogée. IA intégrée, connectivité avancée et design futuriste.",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=400&fit=crop",
      link: "/collections/tech"
    },
    {
      id: 3,
      name: "Lifestyle Collection",
      description: "Élégance quotidienne et confort optimal pour tous les moments de votre vie.",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=400&fit=crop",
      link: "/collections/lifestyle"
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Nos Collections
          </h2>
          <p className="text-xl text-gray-300">
            Découvrez notre gamme complète adaptée à chaque style de vie
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {collection.name}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {collection.description}
                    </p>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                      size="lg"
                    >
                      Explorer
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
