import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Produit } from '../../types/product';
import { ProductImage } from './ProductImage';
import { Heart, Eye, ShoppingCart, Check, Truck, ShieldCheck, Clock } from 'lucide-react';
// Importation de l'utilitaire cn
import { cn, generateSlug } from '../../lib/utils';

interface ProductCardProps {
  product: Produit;
  onAddToCart: (product: Produit) => void;
  onAddToFavorite?: (product: Produit) => void;
  onQuickView?: (product: Produit) => void;
  isFavorite?: boolean;
  badge?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onAddToFavorite,
  onQuickView,
  isFavorite = false,
  badge,
  className = ''
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Formatage du prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  // Calcul du pourcentage de réduction si applicable
  const discount = product.prixOriginal && product.prix < product.prixOriginal ? 
    Math.round((1 - product.prix / product.prixOriginal) * 100) : null;
  
  // Gestion du clic sur le bouton d'ajout au panier
  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    
    // Animation de confirmation
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };
  
  // Détermination de la collection ou catégorie à afficher
  const category = product.collection?.nom || product.categorie || "LIFESTYLE";
  
  // Gestion du rating
  const rating = product.rating || 5;
  const reviews = product.nombreAvis || 0;
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300",
        "hover:shadow-lg hover:translate-y-[-2px] focus-within:shadow-lg",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
      tabIndex={0}
    >
      {/* Badge produit (Nouveau, Solde, etc.) */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <Badge 
            variant="secondary"
            className="bg-green-500 hover:bg-green-600 text-white font-medium shadow-sm transition-transform duration-300 group-hover:scale-105"
          >
            {badge}
          </Badge>
        </div>
      )}
      
      {/* Badge réduction si applicable */}
      {discount && (
        <div className="absolute top-3 right-3 z-10">
          <Badge 
            variant="destructive"
            className="bg-red-500 hover:bg-red-600 text-white font-medium shadow-sm transition-transform duration-300 group-hover:scale-105"
          >
            -{discount}%
          </Badge>
        </div>
      )}
      
      {/* Container image avec actions rapides */}
      <div className="relative h-64 overflow-hidden">
        {/* Image avec effet zoom au hover - cliquable */}
        <Link to={`/produit/${product.slug || generateSlug(product.nom)}`}>
          <ProductImage 
            src={product.image || "/placeholder.svg"} 
            alt={product.nom} 
            aspectRatio="square"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ willChange: 'transform' }}
          />
        </Link>
        
        {/* Overlay d'actions rapides */}
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/20",
            "opacity-0 transition-opacity duration-300", 
            isHovering ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex space-x-2">
            {onAddToFavorite && (
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full bg-white hover:bg-gray-50 shadow-md"
                onClick={() => onAddToFavorite(product)}
                aria-label="Ajouter aux favoris"
              >
                <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-700")} />
              </Button>
            )}
            
            {onQuickView ? (
              <Button 
                variant="secondary"
                size="icon" 
                className="rounded-full bg-white hover:bg-gray-50 shadow-md"
                onClick={() => onQuickView(product)}
                aria-label="Aperçu rapide"
              >
                <Eye className="h-5 w-5 text-gray-700" />
              </Button>
            ) : (
              <Button 
                variant="secondary"
                size="icon" 
                className="rounded-full bg-white hover:bg-gray-50 shadow-md"
                onClick={() => window.location.href = `/produit/${product.slug || generateSlug(product.nom)}`}
                aria-label="Voir le produit"
              >
                <Eye className="h-5 w-5 text-gray-700" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Contenu produit */}
      <div className="p-4">
        {/* Catégorie */}
        <p className="text-xs font-medium text-blue-600 mb-1">{category}</p>
        
        {/* Nom du produit - cliquable */}
        <Link to={`/produit/${product.slug || generateSlug(product.nom)}`}>
          <h3 className="font-medium text-gray-900 truncate mb-1 group-hover:text-blue-700 transition-colors hover:underline">
            {product.nom}
          </h3>
        </Link>
        
        {/* Système de notation */}
        <div className="flex items-center mb-2">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-4 w-4 ${rating >= star ? "text-amber-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500">({reviews})</span>
        </div>
        
        {/* Description courte */}
        <p className="text-sm text-gray-600 line-clamp-2 h-10 mb-2">{product.description}</p>
        
        {/* Prix et ancien prix si promotion */}
        <div className="flex items-center mb-3">
          {product.prixOriginal && (
            <span className="text-sm text-gray-500 line-through mr-2">
              {formatPrice(product.prixOriginal)}
            </span>
          )}
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.prix)}
          </span>
        </div>
        
        {/* Informations additionnelles */}
        <div className="space-y-1 mb-4">
          <p className="flex items-center text-xs text-green-600">
            <Truck className="h-3 w-3 mr-1" />
            Livraison gratuite dès 50€
          </p>
          <p className="flex items-center text-xs text-gray-500">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Garantie 2 ans
          </p>
          {product.disponible && (
            <p className="flex items-center text-xs text-green-600">
              <Check className="h-3 w-3 mr-1" />
              En stock
            </p>
          )}
          {!product.disponible && (
            <p className="flex items-center text-xs text-amber-600">
              <Clock className="h-3 w-3 mr-1" />
              En réapprovisionnement
            </p>
          )}
        </div>
        
        {/* Bouton d'action principal */}
        <Button
          className={cn(
            "w-full flex items-center justify-center",
            "transition-all duration-300 ease-out",
            isAdding ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
          )}
          onClick={handleAddToCart}
          disabled={isAdding || !product.disponible}
          aria-disabled={isAdding || !product.disponible}
          aria-label="Ajouter au panier"
        >
          {isAdding ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Ajouté
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.disponible ? "Ajouter au panier" : "Indisponible"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
