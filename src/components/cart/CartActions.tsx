
import { CreditCard, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartActionsProps {
  onClearCart: () => void;
  onCheckout: () => void;
  isBusinessUser: boolean;
  itemCount: number;
}

export const CartActions = ({ 
  onClearCart, 
  onCheckout, 
  isBusinessUser, 
  itemCount 
}: CartActionsProps) => {
  return (
    <div className="space-y-4">
      {/* Bouton principal */}
      <Button 
        size="lg" 
        className={`w-full ${
          isBusinessUser 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-primary hover:bg-primary/90'
        }`}
        onClick={onCheckout}
        disabled={itemCount === 0}
      >
        {isBusinessUser ? (
          <>
            <FileText className="mr-2 h-5 w-5" />
            Demander un devis
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Passer commande
          </>
        )}
      </Button>

      {/* Actions secondaires */}
      <div className="flex gap-2">
        {isBusinessUser && (
          <Button variant="outline" size="sm" className="flex-1">
            Sauvegarder le panier
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClearCart}
          disabled={itemCount === 0}
          className={`${isBusinessUser ? 'flex-1' : 'w-full'} text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20`}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Vider le panier
        </Button>
      </div>

      {/* Informations contextuelles */}
      <div className="text-center text-sm text-muted-foreground">
        {isBusinessUser ? (
          <p>Un commercial vous contactera sous 24h pour finaliser votre commande</p>
        ) : (
          <p>Paiement sécurisé • Livraison rapide • Service client 7j/7</p>
        )}
      </div>
    </div>
  );
};
