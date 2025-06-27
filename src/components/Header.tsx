
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { UserMenu } from './UserMenu';
import { useCart } from '@/hooks/useCart';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isB2B = location.pathname.startsWith('/b2b');
  const { itemCount } = useCart();

  const navigation = isB2B ? [
    { name: 'Accueil Pro', href: '/b2b' },
    { name: 'Catalogue Pro', href: '/b2b/catalog' },
    { name: 'Devenir Partenaire', href: '/b2b/partnership' },
    { name: 'Support', href: '/b2b/support' },
  ] : [
    { name: 'Accueil', href: '/' },
    { name: 'Produits', href: '/products' },
    { name: 'Technologie', href: '/technology' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Carrières', href: '/careers' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={isB2B ? '/b2b' : '/'} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EG</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              {isB2B ? 'EUROGLOBAL PRO' : 'EUROGLOBAL'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* User Type Switcher */}
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <Link to={isB2B ? '/b2c' : '/b2b'}>
                {isB2B ? 'Je suis un particulier' : 'Je suis un professionnel'}
              </Link>
            </Button>
            
            <LanguageSelector />
            <ThemeToggle />
            {!isB2B && (
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/checkout">
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-600 hover:bg-blue-600"
                    >
                      {itemCount > 9 ? '9+' : itemCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            )}
            <UserMenu />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800"
          >
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Cart Link */}
              {!isB2B && (
                <Link
                  to="/checkout"
                  className="mx-3 mt-4 px-3 py-2 border border-gray-300 rounded-md text-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Mon panier {itemCount > 0 && `(${itemCount})`}
                </Link>
              )}
              
              {/* Mobile User Type Switcher */}
              <Link
                to={isB2B ? '/b2c' : '/b2b'}
                className="mx-3 mt-4 px-3 py-2 border border-gray-300 rounded-md text-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {isB2B ? 'Je suis un particulier' : 'Je suis un professionnel'}
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
