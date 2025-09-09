
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CollectionsSection = () => {
  const collections = [
    {
      id: 1,
      name: "Classic Collection",
      description: "L'élégance intemporelle rencontre l'innovation",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=600&fit=crop",
      video: "https://videos.pexels.com/video-files/3196284/3196284-uhd_2560_1440_30fps.mp4"
    },
    {
      id: 2,
      name: "Pro Collection",
      description: "Performance professionnelle pour les exigeants",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=600&fit=crop",
      video: "https://videos.pexels.com/video-files/3196284/3196284-uhd_2560_1440_30fps.mp4"
    },
    {
      id: 3,
      name: "Elite Collection",
      description: "Le summum de la technologie et du design",
      image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&h=600&fit=crop",
      video: "https://videos.pexels.com/video-files/3196284/3196284-uhd_2560_1440_30fps.mp4"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Collection
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Découvrez nos gammes conçues pour chaque style de vie
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl bg-black h-[500px] cursor-pointer"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {collection.name}
                </h3>
                <p className="text-gray-200 mb-6">
                  {collection.description}
                </p>
                <Button 
                  variant="outline" 
                  className="self-start bg-white/10 border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
