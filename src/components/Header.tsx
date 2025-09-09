import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag, Home } from 'lucide-react';
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
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Accueil Pro', href: '/b2b' },
    { name: 'Catalogue Pro', href: '/b2b/catalog' },
    { name: 'Boutique', href: '/shop' },
    { name: 'Devenir Partenaire', href: '/b2b/partnership' },
    { name: 'Support', href: '/b2b/support' },
  ] : [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Boutique', href: '/shop' },
    { name: 'Notre Sélection', href: '/notre-selection' },
    { name: 'Technologie', href: '/technology' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EG</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              {isB2B ? 'My Vision Connect PRO' : 'My Vision Connect'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSelector />
            <UserMenu />
            <Link to="/account/cart" className="relative p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.href
                    ? 'bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
