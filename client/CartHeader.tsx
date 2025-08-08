
import { ShoppingCart, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CartHeaderProps {
  itemCount: number;
  isBusinessUser: boolean;
  companyName?: string;
}

export const CartHeader = ({ itemCount, isBusinessUser, companyName }: CartHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isBusinessUser 
            ? 'bg-blue-100 dark:bg-blue-900/30' 
            : 'bg-gray-100 dark:bg-gray-800'
        }`}>
          <ShoppingCart className={`h-6 w-6 ${
            isBusinessUser 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-300'
          }`} />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold">Mon panier</h1>
          <p className="text-muted-foreground mt-1">
            {itemCount === 0 
              ? 'Aucun produit' 
              : `${itemCount} produit${itemCount > 1 ? 's' : ''}`
            }
          </p>
        </div>
      </div>

      {isBusinessUser && (
        <div className="text-right">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-2">
            <Building className="mr-1 h-3 w-3" />
            Compte Professionnel
          </Badge>
          {companyName && (
            <p className="text-sm text-muted-foreground">{companyName}</p>
          )}
        </div>
      )}
    </div>
  );
};
