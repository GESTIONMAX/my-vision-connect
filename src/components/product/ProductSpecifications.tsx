
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductSpecificationsProps {
  specifications: Record<string, string>;
  productSlug?: string;
}

export const ProductSpecifications = ({ specifications }: ProductSpecificationsProps) => {
  // Les spécifications sont déjà parsées dans useProducts, on les utilise directement
  if (Object.keys(specifications).length === 0) {
    return null;
  }
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
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-start py-3 border-b border-border/50">
                <span className="font-medium text-foreground flex-1">{key}</span>
                <span className="text-muted-foreground text-sm text-right flex-1">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
