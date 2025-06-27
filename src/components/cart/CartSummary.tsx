
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  subtotal: number;
  discountAmount: number;
  businessDiscount: number;
  total: number;
  isBusinessUser: boolean;
  itemCount: number;
}

export const CartSummary = ({ 
  subtotal, 
  discountAmount, 
  businessDiscount, 
  total, 
  isBusinessUser,
  itemCount 
}: CartSummaryProps) => {
  const tva = isBusinessUser ? total * 0.2 : 0; // TVA 20% pour affichage B2B
  const totalTTC = isBusinessUser ? total + tva : total;

  return (
    <Card className={isBusinessUser ? 'border-blue-200 dark:border-blue-800' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Récapitulatif</span>
          {isBusinessUser && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Tarif Pro
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sous-total */}
        <div className="flex justify-between">
          <span>Sous-total ({itemCount} produit{itemCount > 1 ? 's' : ''})</span>
          <span>{subtotal.toFixed(2)}€ {isBusinessUser ? 'HT' : 'TTC'}</span>
        </div>

        {/* Remise professionnelle */}
        {businessDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Remise professionnelle (-{(businessDiscount * 100).toFixed(0)}%)</span>
            <span>-{discountAmount.toFixed(2)}€</span>
          </div>
        )}

        <Separator />

        {/* Total HT pour les professionnels */}
        {isBusinessUser && (
          <div className="flex justify-between font-semibold text-blue-600">
            <span>Total HT</span>
            <span>{total.toFixed(2)}€</span>
          </div>
        )}

        {/* TVA pour les professionnels */}
        {isBusinessUser && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>TVA (20%)</span>
            <span>{tva.toFixed(2)}€</span>
          </div>
        )}

        {/* Total final */}
        <div className={`flex justify-between text-lg font-bold ${
          isBusinessUser ? 'text-blue-600' : 'text-primary'
        }`}>
          <span>Total {isBusinessUser ? 'TTC' : ''}</span>
          <span>{(isBusinessUser ? totalTTC : total).toFixed(2)}€</span>
        </div>

        {/* Informations additionnelles */}
        <div className="text-xs text-muted-foreground space-y-1">
          {isBusinessUser ? (
            <>
              <p>• Livraison gratuite dès 200€ HT</p>
              <p>• Paiement à 30 jours sur facture</p>
              <p>• Support dédié disponible</p>
            </>
          ) : (
            <>
              <p>• Livraison gratuite dès 50€</p>
              <p>• Retours gratuits sous 30 jours</p>
              <p>• Garantie 2 ans incluse</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
