import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

// Exemple de données de produits populaires
const popularProducts = [
  {
    id: 1,
    name: "Chamelo Vision One",
    description: "Nos lunettes phares avec technologie adaptative de première génération",
    price: 299.99,
    rating: 4.8,
    reviews: 120,
    image: "/placeholder.svg",
    badge: "Populaire"
  },
  {
    id: 2,
    name: "Chamelo Sport",
    description: "Conçues pour les activités sportives avec une résistance maximale",
    price: 349.99,
    rating: 4.7,
    reviews: 84,
    image: "/placeholder.svg",
    badge: "Nouveau"
  },
  {
    id: 3,
    name: "Chamelo Classic",
    description: "Design intemporel allié à notre technologie exclusive",
    price: 249.99,
    rating: 4.5,
    reviews: 156,
    image: "/placeholder.svg",
    badge: null
  }
];

export const PopularProductsShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {popularProducts.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: product.id * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover"
            />
            {product.badge && (
              <div className="absolute top-2 right-2">
                <Badge>{product.badge}</Badge>
              </div>
            )}
          </div>
          
          <div className="p-5">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{product.name}</h3>
              <div className="text-lg font-bold text-gray-900 dark:text-white">${product.price}</div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{product.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  ({product.reviews})
                </span>
              </div>
              <Button size="sm">Découvrir</Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
