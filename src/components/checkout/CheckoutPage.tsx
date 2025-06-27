import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { CartSummary } from '@/components/cart/CartSummary';
import { CartItems } from '@/components/cart/CartItems';
import { CheckoutSteps } from './CheckoutSteps';
import { PaymentMethod } from './PaymentMethod';
import { AccountCreation } from './AccountCreation';
import { EmptyCart } from '@/components/cart/EmptyCart';

export type CheckoutStep = 'cart' | 'payment' | 'account' | 'confirmation';

export const CheckoutPage = () => {
  const { user } = useAuth();
  const { 
    items, 
    updateQuantity, 
    removeItem,
    subtotal, 
    discountAmount, 
    businessDiscount, 
    total, 
    itemCount,
    isBusinessUser 
  } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  // Redirection automatique si l'utilisateur se connecte pendant le processus
  useEffect(() => {
    if (user && currentStep === 'account') {
      console.log('Utilisateur connecté détecté, redirection vers confirmation');
      setCurrentStep('confirmation');
    }
  }, [user, currentStep]);

  if (itemCount === 0) {
    return <EmptyCart />;
  }

  const handleNextStep = () => {
    if (currentStep === 'cart') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep(user ? 'confirmation' : 'account');
    } else if (currentStep === 'account') {
      setCurrentStep('confirmation');
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'payment') {
      setCurrentStep('cart');
    } else if (currentStep === 'account') {
      setCurrentStep('payment');
    }
  };

  const handleAccountCreated = () => {
    console.log('Compte créé/connexion réussie, redirection vers confirmation');
    setCurrentStep('confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <CheckoutSteps currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {currentStep === 'cart' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Votre panier</h2>
              <CartItems
                items={items}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                isBusinessUser={isBusinessUser}
                businessDiscount={businessDiscount}
              />
            </div>
          )}

          {currentStep === 'payment' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Mode de paiement</h2>
              <PaymentMethod
                selectedMethod={selectedPaymentMethod}
                onMethodChange={setSelectedPaymentMethod}
                isBusinessUser={isBusinessUser}
              />
            </div>
          )}

          {currentStep === 'account' && !user && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Connexion ou création de compte</h2>
              <AccountCreation
                onAccountCreated={handleAccountCreated}
                isBusinessUser={isBusinessUser}
              />
            </div>
          )}

          {currentStep === 'confirmation' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Confirmation</h2>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <p className="text-green-800 dark:text-green-200">
                  {isBusinessUser 
                    ? 'Votre demande de devis a été transmise. Un commercial vous contactera sous 24h.'
                    : 'Votre commande a été confirmée. Vous recevrez un email de confirmation.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <CartSummary
            subtotal={subtotal}
            discountAmount={discountAmount}
            businessDiscount={businessDiscount}
            total={total}
            isBusinessUser={isBusinessUser}
            itemCount={itemCount}
          />

          <div className="space-y-3">
            {currentStep !== 'confirmation' && (
              <button
                onClick={handleNextStep}
                disabled={currentStep === 'payment' && !selectedPaymentMethod}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                {currentStep === 'cart' && 'Continuer vers le paiement'}
                {currentStep === 'payment' && (user ? 'Finaliser la commande' : 'Se connecter ou créer un compte')}
                {currentStep === 'account' && 'Finaliser la commande'}
              </button>
            )}

            {currentStep !== 'cart' && currentStep !== 'confirmation' && (
              <button
                onClick={handlePrevStep}
                className="w-full border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Retour
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
