
import { ShoppingCart, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export const EmptyCart = () => {
  const { profile } = useAuth();
  const isBusinessUser = profile?.user_type === 'business';

  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
            isBusinessUser 
              ? 'bg-blue-100 dark:bg-blue-900/30' 
              : 'bg-gray-100 dark:bg-gray-800'
          }`}>
            <ShoppingCart className={`h-10 w-10 ${
              isBusinessUser 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-400'
            }`} />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">
          Votre panier est vide
        </h3>
        
        <p className="text-muted-foreground mb-6">
          {isBusinessUser 
            ? 'Découvrez notre catalogue professionnel et bénéficiez de tarifs préférentiels'
            : 'Découvrez nos collections de lunettes et trouvez votre style'
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className={isBusinessUser ? 'bg-blue-600 hover:bg-blue-700' : ''}>
            <Link to={isBusinessUser ? '/b2b/catalog' : '/products'}>
              <Package className="mr-2 h-4 w-4" />
              {isBusinessUser ? 'Catalogue Pro' : 'Voir les produits'}
            </Link>
          </Button>
          
          {isBusinessUser && (
            <Button variant="outline" asChild>
              <Link to="/b2b">
                Espace Professionnel
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
