import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Music, 
  Shield, 
  Smartphone, 
  Eye,
  Heart,
  Droplets,
  Battery
} from 'lucide-react';

interface ProductKeyFeaturesProps {
  productSlug: string;
}

export const ProductKeyFeatures = ({ productSlug }: ProductKeyFeaturesProps) => {
  // Définir les caractéristiques spécifiques pour Music Shield
  const getMusicShieldFeatures = () => [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Teinte Électrochrome Ajustable",
      description: "Adaptation automatique ou manuelle aux conditions lumineuses",
      highlight: true
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: "Audio Intégré",
      description: "Système audio premium pour musique et appels pendant l'activité",
      highlight: true
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Design Sportif",
      description: "Optimisées pour cyclisme, course et sports de plein air",
      highlight: false
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Technologie Intelligente",
      description: "Connectivité Bluetooth et fonctionnalités intelligentes",
      highlight: false
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Protection UV",
      description: "Sécurité et confort visuel améliorés contre l'éblouissement",
      highlight: false
    },
    {
      icon: <Droplets className="h-6 w-6" />,
      title: "Résistance à l'Eau",
      description: "Conçues pour résister aux conditions météorologiques",
      highlight: false
    }
  ];

  const getDefaultFeatures = () => [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Protection UV",
      description: "Protection complète contre les rayons UV",
      highlight: false
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Qualité Premium",
      description: "Matériaux de haute qualité et finitions soignées",
      highlight: false
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Confort",
      description: "Design ergonomique pour un port prolongé",
      highlight: false
    }
  ];

  const features = productSlug.includes('music-shield') 
    ? getMusicShieldFeatures() 
    : getDefaultFeatures();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-12"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Caractéristiques Clés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`flex gap-4 p-4 rounded-lg border transition-colors ${
                  feature.highlight 
                    ? 'border-primary/20 bg-primary/5' 
                    : 'border-border bg-background'
                }`}
              >
                <div className={`flex-shrink-0 p-2 rounded-full ${
                  feature.highlight 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    {feature.highlight && (
                      <Badge variant="secondary" className="text-xs">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};