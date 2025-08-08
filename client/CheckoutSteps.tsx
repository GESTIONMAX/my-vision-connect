
import { Check } from 'lucide-react';
import { CheckoutStep } from './CheckoutPage';

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
}

export const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  const steps = [
    { id: 'cart', label: 'Panier', completed: ['payment', 'account', 'confirmation'].includes(currentStep) },
    { id: 'payment', label: 'Paiement', completed: ['account', 'confirmation'].includes(currentStep) },
    { id: 'account', label: 'Compte', completed: ['confirmation'].includes(currentStep) },
    { id: 'confirmation', label: 'Confirmation', completed: false }
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step.completed 
                ? 'bg-green-500 border-green-500 text-white'
                : currentStep === step.id
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-gray-300 text-gray-400'
            }`}>
              {step.completed ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
            <span className={`ml-2 font-medium ${
              currentStep === step.id 
                ? 'text-blue-600 dark:text-blue-400'
                : step.completed 
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-500'
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${
                step.completed ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
