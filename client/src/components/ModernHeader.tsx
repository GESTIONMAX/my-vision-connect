import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  User,
  Settings,
  LogOut,
  ShoppingCart,
  Home,
  Package,
  HelpCircle,
  Briefcase,
  FileText,
  Zap
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { useCart } from '@/hooks/useCart';

export const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const isB2B = location.pathname.startsWith('/b2b');
  const { itemCount } = useCart();

  const navigation = isB2B ? [
    { name: 'Accueil Pro', href: '/b2b', icon: <Home className="h-4 w-4" /> },
    { name: 'Catalogue Pro', href: '/b2b/catalog', icon: <Package className="h-4 w-4" /> },
    { name: 'Catalogue Chamelo', href: '/chamelo-catalog', icon: <Zap className="h-4 w-4" /> },
    { name: 'Dashboard Chamelo', href: '/chamelo-dashboard', icon: <FileText className="h-4 w-4" /> },
    { name: 'Devenir Partenaire', href: '/b2b/partnership', icon: <Briefcase className="h-4 w-4" /> },
    { name: 'Support', href: '/b2b/support', icon: <HelpCircle className="h-4 w-4" /> },
  ] : [
    { name: 'Catalogue Chamelo', href: '/chamelo-catalog', icon: <Zap className="h-4 w-4" /> },
    { name: 'Blog', href: '/blog', icon: <FileText className="h-4 w-4" /> },
    { name: 'Technologie', href: '/technology', icon: <Zap className="h-4 w-4" /> },
    { name: 'FAQ', href: '/faq', icon: <HelpCircle className="h-4 w-4" /> },
    { name: 'Carrières', href: '/careers', icon: <Briefcase className="h-4 w-4" /> },
  ];

  const userNavigation = [
    { name: 'Mon compte', href: '/account', icon: <User className="h-4 w-4" /> },
    { name: 'Commandes', href: '/orders', icon: <ShoppingCart className="h-4 w-4" /> },
    { name: 'Paramètres', href: '/settings', icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={isB2B ? '/b2b' : '/'} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EG</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              {isB2B ? 'EUROGLOBAL PRO' : 'EUROGLOBAL'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className="flex items-center gap-2"
              >
                <Link to={item.href}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <DropdownMenu open={searchOpen} onOpenChange={setSearchOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-0" align="end" forceMount>
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Rechercher des produits..."
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Type Switcher */}
            <Button 
              variant="outline" 
              size="sm"
              className="hidden sm:flex items-center gap-1"
              asChild
            >
              <Link to={isB2B ? '/' : '/b2b'}>
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

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="Profil" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {userNavigation.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.href} className="w-full flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/avatars/01.png" alt="Profil" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-white">John Doe</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">john@example.com</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))}
                  <button
                    className="w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => {
                      // Handle logout
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};