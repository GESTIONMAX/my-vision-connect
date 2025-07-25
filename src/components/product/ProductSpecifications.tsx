
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductSpecificationsProps {
  specifications: Record<string, string>;
  productSlug?: string;
}

export const ProductSpecifications = ({ specifications, productSlug }: ProductSpecificationsProps) => {
  // Fonction pour parser les spécifications depuis ecommerce_readiness
  const parseSpecifications = (ecommerceReadiness: string) => {
    if (!ecommerceReadiness) return {};
    
    // Diviser par • et créer des paires clé-valeur
    const specs: Record<string, string> = {};
    const items = ecommerceReadiness.split(' • ');
    
    items.forEach((item, index) => {
      const trimmed = item.trim();
      if (trimmed) {
        // Essayer de séparer par le premier espace pour avoir une clé descriptive
        const parts = trimmed.split(' ');
        if (parts.length > 1) {
          const key = parts[0];
          const value = parts.slice(1).join(' ');
          specs[key] = value;
        } else {
          specs[`Spécification ${index + 1}`] = trimmed;
        }
      }
    });
    
    return specs;
  };

  // Récupérer les spécifications depuis useProducts si disponible
  const [productSpecs, setProductSpecs] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const fetchProductSpecs = async () => {
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        const { data } = await supabase
          .from('products')
          .select('ecommerce_readiness, lens_technology')
          .or(`sku.eq.${productSlug},id.eq.${productSlug}`)
          .maybeSingle();
        
        if (data?.ecommerce_readiness) {
          const parsedSpecs = parseSpecifications(data.ecommerce_readiness);
          if (data.lens_technology) {
            parsedSpecs['Technologie des verres'] = data.lens_technology;
          }
          setProductSpecs(parsedSpecs);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des spécifications:', error);
      }
    };

    if (productSlug) {
      fetchProductSpecs();
    }
  }, [productSlug]);

  const finalSpecs = Object.keys(productSpecs).length > 0 ? productSpecs : specifications;
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
