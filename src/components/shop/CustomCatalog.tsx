import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Eye, ArrowRight } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount?: number;
}

interface CategoryData {
  id: string;
  name: string;
  collections: Collection[];
  color: string;
  gradient: string;
}

const CustomCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('sport');

  const catalogData: CategoryData[] = [
    {
      id: 'sport',
      name: 'Sport',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      collections: [
        {
          id: 'shields',
          name: 'Lunettes SHields',
          slug: 'shields',
          description: 'Protection maximale pour les sports extrêmes',
          image: '/lovable-uploads/0a8f5b45-7c63-46fc-b2b4-80ae263fd173.png',
          productCount: 12
        },
        {
          id: 'music-shield',
          name: 'Lunettes Music Shield',
          slug: 'music-shield',
          description: 'L\'audio intégré pour votre performance',
          image: '/lovable-uploads/2ec5555e-8f2b-468a-992b-865f2f39f822.png',
          productCount: 8
        }
      ]
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      collections: [
        {
          id: 'veil',
          name: 'Lunettes Veil',
          slug: 'veil',
          description: 'Élégance et discrétion au quotidien',
          image: '/lovable-uploads/b711eaf0-a0ba-49c2-8022-38d498c882d5.png',
          productCount: 15
        },
        {
          id: 'dragon',
          name: 'Lunettes Dragon',
          slug: 'dragon',
          description: 'Style audacieux et connectivité avancée',
          image: '/lovable-uploads/f6429810-9066-4e7e-a6c3-bddacc2dd7db.png',
          productCount: 10
        }
      ]
    },
    {
      id: 'prismatic',
      name: 'Prismatic',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      collections: [
        {
          id: 'euphoria',
          name: 'Lunettes Euphoria',
          slug: 'euphoria',
          description: 'Réalité augmentée et expérience immersive',
          image: '/lovable-uploads/0a8f5b45-7c63-46fc-b2b4-80ae263fd173.png',
          productCount: 6
        },
        {
          id: 'auria',
          name: 'Lunettes Auria',
          slug: 'auria',
          description: 'Technologie prismatique révolutionnaire',
          image: '/lovable-uploads/2ec5555e-8f2b-468a-992b-865f2f39f822.png',
          productCount: 4
        }
      ]
    }
  ];

  const handleCollectionClick = (categoryId: string, collectionSlug: string) => {
    // Navigate to products filtered by this collection
    console.log(`Navigation vers: ${categoryId}/${collectionSlug}`);
    // TODO: Implement navigation logic
  };

  return (
    <div className="w-full bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            Notre Catalogue Personnalisé
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Découvrez nos collections exclusives organisées par gamme
          </motion.p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50">
            {catalogData.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {catalogData.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {category.collections.map((collection, index) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/50 bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`} />
                          <img 
                            src={collection.image} 
                            alt={collection.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="bg-background/90 text-foreground">
                              {collection.productCount} produits
                            </Badge>
                          </div>
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {collection.name}
                            </h3>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                          
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {collection.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Voir la collection</span>
                            </div>
                            
                            <button
                              onClick={() => handleCollectionClick(category.id, collection.slug)}
                              className={`px-4 py-2 rounded-lg bg-gradient-to-r ${category.gradient} text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}
                            >
                              Explorer
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CustomCatalog;