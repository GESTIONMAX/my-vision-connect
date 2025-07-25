
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductSpecificationsProps {
  specifications: Record<string, string>;
  productSlug?: string;
}

export const ProductSpecifications = ({ specifications, productSlug }: ProductSpecificationsProps) => {
  // Spécifications détaillées pour Music Shield
  const getMusicShieldSpecs = () => ({
    "Technologie des verres": "Polycarbonate avec technologie électrochrome",
    "Plage d'ajustement": "Catégorie 0 à 3 (adaptatif)",
    "Connectivité": "Bluetooth 5.0",
    "Type d'audio": "Haut-parleurs à conduction osseuse",
    "Autonomie batterie": "8-10 heures d'utilisation",
    "Temps de charge": "1.5 heures (charge rapide)",
    "Poids": "45 grammes",
    "Matériau monture": "Alliage ultra-léger TR90",
    "Résistance à l'eau": "IPX4 (résistant aux éclaboussures)",
    "Compatibilité": "iOS/Android",
    "Protection UV": "100% UV400",
    "Contrôle": "Tactile et vocal",
    ...specifications
  });

  const finalSpecs = productSlug?.includes('music-shield') 
    ? getMusicShieldSpecs() 
    : specifications;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-16"
    >
      <Card>
        <CardHeader>
          <CardTitle>Spécifications techniques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(finalSpecs).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="font-medium text-foreground">{key}</span>
                <span className="text-muted-foreground font-mono text-sm">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
