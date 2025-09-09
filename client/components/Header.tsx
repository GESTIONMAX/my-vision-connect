import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, ChevronDown, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  
  // Détection du scroll pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Gestion du mode sombre
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implémenter la logique de changement de thème ici
  };
  
  // Vérifier si le lien est actif
  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };
  
  // Style pour les liens de navigation
  const navLinkClass = (path: string) => cn(
    "relative font-medium transition-all duration-300 px-4 py-2.5 rounded-md mx-1",
    "hover:text-blue-600 hover:bg-blue-50/50",
    isActive(path)
      ? "text-blue-600 font-semibold"
      : "text-slate-600 hover:text-blue-600"
  );
  
  // Style pour le header qui change au scroll
  const headerClass = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
    scrolled
      ? "bg-white/95 backdrop-blur-sm shadow-sm py-3"
      : "bg-white/95 py-4"
  );

  return (
    <>
      <header className={headerClass}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              VISION<span className="text-blue-400">connect</span>
            </span>
          </Link>
          
          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/shop" 
              className={cn(
                navLinkClass('/shop'),
                "group relative overflow-hidden"
              )}
            >
              <span className="relative z-10">Boutique</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/faq" 
              className={cn(
                navLinkClass('/faq'),
                "group relative overflow-hidden"
              )}
            >
              <span className="relative z-10">FAQ</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                navLinkClass('/contact'),
                "group relative overflow-hidden"
              )}
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/b2b" 
              className={cn(
                navLinkClass('/b2b'),
                "group relative overflow-hidden"
              )}
            >
              <span className="relative z-10">Espace B2B</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          
          {/* Actions desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Recherche */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-full p-2 transition-colors duration-200"
            >
              <Search size={20} />
            </Button>
            
            {/* Mode sombre/clair */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-full p-2 transition-colors duration-200" 
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            {/* Panier */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-full p-2 transition-colors duration-200 relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-medium">3</span>
            </Button>
            
            {/* Compte */}
            <Button variant="ghost" className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50">
              <User size={18} />
              <span className="hidden lg:inline-block">Compte</span>
              <ChevronDown size={14} />
            </Button>
          </div>
          
          {/* Bouton menu mobile */}
          <button
            className="md:hidden text-slate-600 hover:text-blue-600 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Espace pour éviter que le contenu ne soit caché sous le header fixe */}
      <div className={cn("w-full", scrolled ? "h-16" : "h-20")} />
      
      {/* Menu mobile */}
      <div className={cn(
        "fixed inset-0 bg-white z-40 transition-transform duration-300 transform md:hidden",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          {/* Navigation mobile */}
          <nav className="flex flex-col space-y-4 mt-8">
            <Link 
              to="/shop" 
              className="text-xl font-medium py-2 border-b border-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Boutique
            </Link>
            <Link 
              to="/blog" 
              className="text-xl font-medium py-2 border-b border-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/faq" 
              className="text-xl font-medium py-2 border-b border-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              to="/contact" 
              className="text-xl font-medium py-2 border-b border-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/b2b" 
              className="text-xl font-medium py-2 border-b border-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Espace B2B
            </Link>
          </nav>
          
          {/* Actions mobile */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm" className="w-1/2 mr-2">
                <User size={16} className="mr-1" />
                Se connecter
              </Button>
              <Button variant="default" size="sm" className="w-1/2 ml-2">
                <ShoppingCart size={16} className="mr-1" />
                Panier (3)
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Mode {darkMode ? 'clair' : 'sombre'}</span>
              <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
