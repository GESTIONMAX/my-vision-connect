
import { motion } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';

export const LifestyleSection = () => {
  const lifestyleImages = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506629905607-5582480b36e2?w=400&h=400&fit=crop",
      alt: "Lifestyle urbain",
      likes: 142,
      user: "@alex_photography"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      alt: "Mode professionnel",
      likes: 89,
      user: "@business_style"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      alt: "Détente weekend",
      likes: 203,
      user: "@weekend_vibes"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      alt: "Style féminin",
      likes: 156,
      user: "@fashion_forward"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      alt: "Élégance moderne",
      likes: 178,
      user: "@modern_elegance"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      alt: "Aventure outdoor",
      likes: 234,
      user: "@outdoor_life"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            #ChameloCommunity
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Découvrez comment nos clients portent leurs Chamelo au quotidien
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {lifestyleImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{item.likes}</span>
                    </div>
                    <Share2 className="h-4 w-4" />
                  </div>
                  <p className="text-xs">{item.user}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
