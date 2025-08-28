import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary' | 'primary' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
    
    // Classes conditionnelles selon le variant
    const variantStyles = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
      link: 'bg-transparent underline-offset-4 hover:underline text-blue-600',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      destructive: 'bg-red-500 text-white hover:bg-red-600',
    };
    
    // Classes conditionnelles selon la taille
    const sizeStyles = {
      default: 'h-10 py-2 px-4 text-sm',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-12 px-8 text-base',
      icon: 'h-9 w-9 p-2',
    };
    
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
    
    return (
      <button className={combinedClassName} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
