import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Glasses, 
  Cable, 
  Shield,
  BookOpen,
  Package
} from 'lucide-react';

interface ProductPackageContentProps {
  productSlug: string;
}

export const ProductPackageContent = ({ productSlug }: ProductPackageContentProps) => {
  const getMusicShieldPackage = () => [
    {
      icon: <Glasses className="h-6 w-6" />,
      item: "Lunettes intelligentes Music Shield",
      description: "Lunettes avec technologie électrochrome et audio intégré"
    },
    {
      icon: <Cable className="h-6 w-6" />,
      item: "Câble de charge USB-C",
      description: "Charge rapide magnétique"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      item: "Étui de protection premium",
      description: "Étui rigide de transport et rangement"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      item: "Kit de nettoyage",
      description: "Chiffon microfibre et solution de nettoyage"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      item: "Manuel d'utilisation",
      description: "Guide complet et carte de garantie"
    }
  ];

  const getDefaultPackage = () => [
    {
      icon: <Glasses className="h-6 w-6" />,
      item: "Lunettes",
      description: "Lunettes avec étui de protection"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      item: "Chiffon de nettoyage",
      description: "Microfibre de qualité premium"
    }
  ];

  const packageContent = productSlug.includes('music-shield') 
    ? getMusicShieldPackage() 
    : getDefaultPackage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Contenu de l'emballage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {packageContent.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex gap-4 p-3 rounded-lg border border-border/50 hover:border-primary/20 transition-colors"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-muted text-muted-foreground">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{item.item}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};