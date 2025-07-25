import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShieldCheck, 
  Headphones, 
  Settings, 
  Wrench,
  Palette
} from 'lucide-react';

interface ProductBenefitsProps {
  productSlug: string;
}

export const ProductBenefits = ({ productSlug }: ProductBenefitsProps) => {
  const getMusicShieldBenefits = () => [
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Sécurité et Confort Visuel Améliorés",
      description: "Grâce à la teinte ajustable, protection optimale contre les UV et l'éblouissement dans toutes les conditions lumineuses."
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Expérience Audio Immersive",
      description: "Profitez de votre musique ou prenez vos appels en toute liberté pendant vos activités sportives."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Polyvalence Maximale",
      description: "Adaptées à diverses conditions lumineuses et activités, des sorties matinales aux sessions en plein soleil."
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Praticité Ultime",
      description: "Fini le besoin de changer de lunettes selon la luminosité. Une seule paire pour toutes les situations."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Style et Performance",
      description: "Design moderne et élégant qui combine esthétique et performance pour un look sportif et tendance."
    }
  ];

  const getDefaultBenefits = () => [
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Protection Optimale",
      description: "Protection complète contre les rayons UV et les éléments extérieurs."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Style Intemporel",
      description: "Design élégant qui s'adapte à toutes les occasions."
    }
  ];

  const benefits = productSlug.includes('music-shield') 
    ? getMusicShieldBenefits() 
    : getDefaultBenefits();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-12"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Bénéfices Utilisateur
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/20 transition-colors"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 text-primary">
                  {benefit.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
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