
import { CreditCard, Building, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  isBusinessUser: boolean;
}

export const PaymentMethod = ({ selectedMethod, onMethodChange, isBusinessUser }: PaymentMethodProps) => {
  const paymentMethods = isBusinessUser ? [
    { id: 'quote', label: 'Demande de devis', icon: Building, description: 'Un commercial vous contactera' },
    { id: 'transfer', label: 'Virement bancaire', icon: Wallet, description: 'Paiement sur facture à 30 jours' }
  ] : [
    { id: 'card', label: 'Carte bancaire', icon: CreditCard, description: 'Paiement sécurisé par Stripe' },
    { id: 'paypal', label: 'PayPal', icon: Wallet, description: 'Paiement via votre compte PayPal' }
  ];

  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => {
        const Icon = method.icon;
        return (
          <Card 
            key={method.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedMethod === method.id 
                ? 'ring-2 ring-blue-500 border-blue-500' 
                : 'border-gray-200 dark:border-gray-700'
            }`}
            onClick={() => onMethodChange(method.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === method.id 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div className="flex-1">
                  <h3 className="font-semibold">{method.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
