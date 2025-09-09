import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold';
    
    // Classes conditionnelles selon le variant
    const variantStyles = {
      default: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      outline: 'border border-gray-300 text-gray-800 dark:border-gray-600 dark:text-gray-300',
      destructive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;
    
    return (
      <div className={combinedClassName} ref={ref} {...props} />
    );
  }
);

Badge.displayName = 'Badge';
