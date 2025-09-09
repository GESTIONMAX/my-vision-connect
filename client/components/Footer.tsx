import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
      {/* Inscription à la newsletter */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12 bg-slate-700/50 p-8 rounded-xl backdrop-blur-sm">
          <div>
            <h3 className="text-2xl font-bold mb-2">Restez informé</h3>
            <p className="text-slate-200">
              Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles et promotions exclusives.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-grow px-4 py-3 rounded-lg bg-slate-600/50 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 text-white"
            />
            <Button 
              className="whitespace-nowrap bg-white hover:bg-gray-100 text-slate-800 font-medium"
            >
              S'abonner <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Liens et informations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Colonne 1: À propos */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-1">Vision Connect</h2>
              <div className="h-1 w-10 bg-blue-400 rounded-full"></div>
            </div>
            <p className="text-blue-100 mb-4">
              Votre spécialiste en lunettes de sport et de protection. 
              Qualité, innovation et expertise à votre service.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2: Liens rapides */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1">Liens rapides</h3>
              <div className="h-1 w-10 bg-blue-400 rounded-full"></div>
            </div>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-blue-100 hover:text-white hover:translate-x-1 flex items-center transition-all"><ArrowRight className="mr-2 h-4 w-4" />Shop</Link></li>
              <li><Link to="/about" className="text-blue-100 hover:text-white hover:translate-x-1 flex items-center transition-all"><ArrowRight className="mr-2 h-4 w-4" />À propos</Link></li>
              <li><Link to="/contact" className="text-blue-100 hover:text-white hover:translate-x-1 flex items-center transition-all"><ArrowRight className="mr-2 h-4 w-4" />Contact</Link></li>
              <li><Link to="/blog" className="text-blue-100 hover:text-white hover:translate-x-1 flex items-center transition-all"><ArrowRight className="mr-2 h-4 w-4" />Blog</Link></li>
              <li><Link to="/careers" className="text-blue-100 hover:text-white hover:translate-x-1 flex items-center transition-all"><ArrowRight className="mr-2 h-4 w-4" />Recrutement</Link></li>
            </ul>
          </div>

          {/* Colonne 3: Catégories */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1">Catégories</h3>
              <div className="h-1 w-10 bg-blue-400 rounded-full"></div>
            </div>
            <ul className="space-y-3">
              <li><Link to="/shop?category=sport" className="text-blue-100 hover:text-white hover:translate-x-1 flex items-center transition-all"><ArrowRight className="mr-2 h-4 w-4" />Lunettes de Sport</Link></li>
              <li><Link to="/shop?category=polarized" className="text-blue-100 hover:text-white hover:translate-x-1 flex items-center transition-all"><ArrowRight className="mr-2 h-4 w-4" />Verres Polarisés</Link></li>
              <li><Link to="/shop?category=prescription" className="text-blue-100 hover:text-white hover:translate-x-1 flex items-center transition-all"><ArrowRight className="mr-2 h-4 w-4" />Verres Correcteurs</Link></li>
              <li><Link to="/shop?category=accessories" className="text-blue-100 hover:text-white hover:translate-x-1 flex items-center transition-all"><ArrowRight className="mr-2 h-4 w-4" />Accessoires</Link></li>
              <li><Link to="/shop?category=new" className="text-blue-100 hover:text-white hover:translate-x-1 flex items-center transition-all"><ArrowRight className="mr-2 h-4 w-4" />Nouveautés</Link></li>
            </ul>
          </div>

          {/* Colonne 4: Contact */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1">Contact</h3>
              <div className="h-1 w-10 bg-blue-400 rounded-full"></div>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-300 mt-0.5" />
                <span className="text-blue-100">123 Rue des Opticiens<br/>75000 Paris, France</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-300" />
                <span className="text-blue-100">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-300" />
                <span className="text-blue-100">contact@vision-connect.fr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre de séparation */}
        <div className="border-t border-blue-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-blue-200 text-sm">
                &copy; {currentYear} Vision Connect. Tous droits réservés.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-blue-200 hover:text-white">Politique de confidentialité</Link>
              <Link to="/terms" className="text-sm text-blue-200 hover:text-white">Conditions d'utilisation</Link>
              <Link to="/legal-notice" className="text-sm text-blue-200 hover:text-white">Mentions légales</Link>
              <Link to="/faq" className="text-sm text-blue-200 hover:text-white">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
