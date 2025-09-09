import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  Share2, 
  Star, 
  Check, 
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  ChevronLeft,
  ChevronDown
} from 'lucide-react';

// Composants UI
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// Types et hooks
import { Produit } from '../types/product';
import { useProduits } from '../hooks/useProduits';
import { formatPrice, generateSlug } from '../lib/utils';

// Composant de galerie d'images produit
const ProductGallery = ({ images, name }: { images: string[], name: string }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Vignettes à gauche */}
      <div className="hidden md:flex col-span-2 flex-col gap-3">
        {images.map((image, idx) => (
          <div 
            key={idx}
            className={`
              aspect-square rounded-md overflow-hidden cursor-pointer border-2 
              ${selectedImage === idx ? 'border-blue-500' : 'border-transparent'}
            `}
            onClick={() => setSelectedImage(idx)}
          >
            <img 
              src={image} 
              alt={`${name} - vue ${idx + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Image principale */}
      <div className="col-span-12 md:col-span-10">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={images[selectedImage]} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Navigation mobile pour les images */}
        <div className="flex justify-center mt-4 md:hidden">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 mx-1 rounded-full ${selectedImage === idx ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => setSelectedImage(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Composant de section "Avis clients"
const ProductReviews = ({ rating, reviewCount }: { rating: number, reviewCount: number }) => {
  // Données mockées pour les avis (à remplacer par des données réelles)
  const reviews = [
    { id: 1, author: "Sophie D.", rating: 5, date: "15/07/2025", content: "Excellentes lunettes, confortables même après plusieurs heures de port. Je les recommande vivement pour le sport.", helpful: 12 },
    { id: 2, author: "Thomas M.", rating: 4, date: "02/06/2025", content: "Très satisfait de mon achat, le design est sobre et élégant. Seul bémol : la housse pourrait être un peu plus rigide pour mieux protéger les verres.", helpful: 8 },
    { id: 3, author: "Claire L.", rating: 5, date: "28/05/2025", content: "Parfaites pour mes séances de course à pied, elles ne bougent pas et la vision est excellente même en plein soleil.", helpful: 15 }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec notation globale */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="font-medium">{rating.toFixed(1)}/5</span>
          <span className="text-gray-500 text-sm">({reviewCount} avis)</span>
        </div>
        
        <Button variant="outline" size="sm">
          Laisser un avis
        </Button>
      </div>
      
      {/* Liste des avis */}
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{review.author}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mt-2">{review.content}</p>
            <div className="mt-3 flex items-center">
              <button className="text-sm text-blue-600 hover:underline flex items-center">
                <Check className="h-3 w-3 mr-1" /> Utile ({review.helpful})
              </button>
              <span className="mx-2 text-gray-300">|</span>
              <button className="text-sm text-gray-500 hover:underline">
                Signaler
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination (pour plus d'avis) */}
      {reviewCount > 3 && (
        <div className="mt-4 flex justify-center">
          <Button variant="outline">
            Voir plus d'avis
          </Button>
        </div>
      )}
    </div>
  );
};

// Composant de section "Caractéristiques techniques"
const ProductSpecifications = ({ specifications }: { specifications: any[] }) => {
  // Si aucune spécification n'est fournie, utiliser des données par défaut
  const specs = specifications.length > 0 ? specifications : [
    { nom: "Matériau monture", valeur: "Acétate premium" },
    { nom: "Poids", valeur: "28g" },
    { nom: "Type de verres", valeur: "Polarisés" },
    { nom: "Indice de protection", valeur: "Catégorie 3" },
    { nom: "Dimensions", valeur: "140-19-145 mm" }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      {specs.map((spec, index) => (
        <div key={index} className="border-b pb-3 border-gray-200">
          <div className="flex justify-between">
            <span className="text-gray-600">{spec.nom}</span>
            <span className="font-medium">{spec.valeur}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Composant page détail produit
const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedVariante, setSelectedVariante] = useState<any | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Préparer pour l'implémentation future du hook
  const { getProduitById } = useProduits();
  
  // Récupération du produit par son slug (ou mock si l'API n'est pas disponible)
  // Note: getProduitById est utilisé temporairement jusqu'à l'implémentation de getProduitBySlug
  const { data: produit, isLoading } = { data: null, isLoading: false }; // Simule un appel API
  
  // Produit par défaut (mock) en attendant l'API ou en cas d'erreur
  const defaultProduit: Produit = {
    id: 1,
    nom: "Shield Pro Polarized",
    description: "Les lunettes Shield Pro Polarized offrent une protection optimale contre les UV et l'éblouissement, idéales pour les activités sportives de plein air. Leur design ergonomique assure un maintien parfait même pendant les mouvements intenses.",
    prix: 199.99,
    prixOriginal: 249.99,
    disponible: true,
    dateCreation: new Date().toISOString(),
    dateModification: new Date().toISOString(),
    image: "/placeholder.svg",
    images: [
      "/placeholder.svg", 
      "/placeholder.svg", 
      "/placeholder.svg", 
      "/placeholder.svg"
    ],
    rating: 4.8,
    nombreAvis: 124,
    categorie: "Sport",
    est_nouveau: true,
    est_populaire: true,
    slug: "shield-pro-polarized",
    variantes: [
      { id: 1, nom: "Noir Mat", couleur: "#000000", prix: 199.99, disponible: true, produitId: 1 },
      { id: 2, nom: "Bleu Navy", couleur: "#000080", prix: 199.99, disponible: true, produitId: 1 },
      { id: 3, nom: "Rouge", couleur: "#FF0000", prix: 209.99, disponible: false, produitId: 1 }
    ],
    specifications: [
      { id: 1, nom: "Matériau monture", valeur: "Acétate premium", produitId: 1 },
      { id: 2, nom: "Poids", valeur: "28g", produitId: 1 },
      { id: 3, nom: "Type de verres", valeur: "Polarisés", produitId: 1 },
      { id: 4, nom: "Indice de protection", valeur: "Catégorie 3", produitId: 1 },
      { id: 5, nom: "Dimensions", valeur: "140-19-145 mm", produitId: 1 }
    ]
  };
  
  // Si le produit est en cours de chargement, afficher un indicateur
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Utiliser le produit de l'API ou le produit par défaut si non trouvé
  const displayedProduct = produit || defaultProduit;
  const productImages = displayedProduct.images || [displayedProduct.image || "/placeholder.svg"];
  
  // Si aucune variante n'est sélectionnée et qu'il y en a de disponibles, sélectionner la première
  useEffect(() => {
    if (!selectedVariante && displayedProduct.variantes && displayedProduct.variantes.length > 0) {
      setSelectedVariante(displayedProduct.variantes.find(v => v.disponible) || displayedProduct.variantes[0]);
    }
  }, [displayedProduct.variantes, selectedVariante]);
  
  // Prix à afficher (variante sélectionnée ou prix de base)
  const displayPrice = selectedVariante?.prix || displayedProduct.prix;
  const displayOriginalPrice = displayedProduct.prixOriginal;
  
  // Calculer la réduction en pourcentage si applicable
  const discountPercentage = displayOriginalPrice && displayOriginalPrice > displayPrice
    ? Math.round((1 - displayPrice / displayOriginalPrice) * 100)
    : null;
  
  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(10, value))); // Limiter entre 1 et 10
  };
  
  const handleAddToCart = () => {
    alert(`${displayedProduct.nom} (${selectedVariante?.nom || 'Standard'}) ajouté au panier (${quantity}x)`);
    // Logique d'ajout au panier à implémenter
  };
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Logique de gestion des favoris à implémenter
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: displayedProduct.nom,
        text: displayedProduct.description,
        url: window.location.href,
      });
    } else {
      // Copier l'URL dans le presse-papier si Web Share API n'est pas disponible
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Fil d'ariane */}
      <nav className="flex text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Accueil</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400 self-center" />
        <Link to="/shop" className="text-gray-500 hover:text-gray-700">Boutique</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400 self-center" />
        <span className="text-gray-900 font-medium">{displayedProduct.nom}</span>
      </nav>
      
      {/* Contenu principal en deux colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Colonne gauche : Galerie d'images */}
        <div>
          <ProductGallery images={productImages} name={displayedProduct.nom} />
        </div>
        
        {/* Colonne droite : Informations produit */}
        <div className="space-y-6">
          {/* Badges et catégorie */}
          <div className="flex flex-wrap gap-2 mb-2">
            {displayedProduct.categorie && (
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                {displayedProduct.categorie}
              </Badge>
            )}
            {displayedProduct.est_nouveau && (
              <Badge className="bg-green-500 hover:bg-green-600">Nouveau</Badge>
            )}
            {displayedProduct.est_populaire && (
              <Badge className="bg-amber-500 hover:bg-amber-600">Populaire</Badge>
            )}
            {discountPercentage && (
              <Badge className="bg-red-500 hover:bg-red-600">-{discountPercentage}%</Badge>
            )}
          </div>
          
          {/* Nom du produit */}
          <h1 className="text-3xl font-bold text-gray-900">{displayedProduct.nom}</h1>
          
          {/* Évaluation */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(displayedProduct.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {displayedProduct.rating?.toFixed(1)} ({displayedProduct.nombreAvis || 0} avis)
            </span>
          </div>
          
          {/* Prix */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(displayPrice)}</span>
            {displayOriginalPrice && displayOriginalPrice > displayPrice && (
              <span className="text-lg text-gray-500 line-through">{formatPrice(displayOriginalPrice)}</span>
            )}
          </div>
          
          {/* Description courte */}
          <p className="text-gray-700">{displayedProduct.description}</p>
          
          {/* Variantes/Couleurs */}
          {displayedProduct.variantes && displayedProduct.variantes.length > 0 && (
            <div>
              <p className="font-medium text-gray-900 mb-2">Couleur:</p>
              <div className="flex flex-wrap gap-3">
                {displayedProduct.variantes.map(variante => (
                  <button
                    key={variante.id}
                    className={`
                      h-10 px-4 rounded-md border transition-all
                      ${variante.disponible ? '' : 'opacity-50 cursor-not-allowed'}
                      ${selectedVariante?.id === variante.id 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                    disabled={!variante.disponible}
                    onClick={() => setSelectedVariante(variante)}
                    style={{
                      backgroundColor: variante.couleur && variante.couleur.startsWith('#') 
                        ? variante.couleur 
                        : undefined
                    }}
                  >
                    <span className={variante.couleur && variante.couleur.startsWith('#') && 
                      parseInt(variante.couleur.slice(1), 16) > 0x888888 
                        ? 'text-black' 
                        : 'text-white'
                    }>
                      {variante.nom}
                    </span>
                  </button>
                ))}
              </div>
              {selectedVariante && !selectedVariante.disponible && (
                <p className="text-amber-600 text-sm mt-2">Cette variante est actuellement indisponible.</p>
              )}
            </div>
          )}
          
          {/* Quantité */}
          <div>
            <p className="font-medium text-gray-900 mb-2">Quantité:</p>
            <div className="flex items-center border border-gray-300 rounded-md w-32">
              <button
                className="px-3 py-2 text-gray-500 hover:text-gray-700"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) handleQuantityChange(value);
                }}
                className="w-full text-center border-0 focus:ring-0"
              />
              <button
                className="px-3 py-2 text-gray-500 hover:text-gray-700"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={selectedVariante && !selectedVariante.disponible}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Ajouter au panier
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12"
              onClick={handleToggleFavorite}
            >
              <Heart 
                className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
              />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="h-12 w-12"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Informations de service */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">
                <span className="font-medium text-green-600">Livraison gratuite</span> à partir de 50€ d'achat
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Garantie <span className="font-medium">2 ans</span></span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-purple-600" />
              <span className="text-gray-700">Retours gratuits sous <span className="font-medium">30 jours</span></span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Onglets d'information */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b mb-0 rounded-none bg-transparent">
            <TabsTrigger
              value="description"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 rounded-none"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 rounded-none"
            >
              Caractéristiques
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 rounded-none"
            >
              Avis clients ({displayedProduct.nombreAvis || 0})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-6">
            <div className="prose prose-blue max-w-none">
              <p>
                {displayedProduct.description}
              </p>
              <p>
                Conçues pour les athlètes et les amateurs de plein air, ces lunettes offrent une protection UV complète et une clarté visuelle exceptionnelle grâce à leurs verres polarisés de haute qualité. La monture légère et durable assure un confort optimal même pendant les activités intenses.
              </p>
              <h3>Caractéristiques principales</h3>
              <ul>
                <li>Verres polarisés pour une vision claire sans éblouissement</li>
                <li>Protection UV400 bloquant 100% des rayons UVA et UVB nocifs</li>
                <li>Monture légère et résistante aux impacts</li>
                <li>Design ergonomique pour un ajustement sécurisé pendant l'activité</li>
                <li>Embouts et plaquettes nasales antidérapants</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="pt-6">
            <ProductSpecifications specifications={displayedProduct.specifications || []} />
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-6">
            <ProductReviews 
              rating={displayedProduct.rating || 0} 
              reviewCount={displayedProduct.nombreAvis || 0} 
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Produits similaires (à implémenter) */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Vous pourriez aussi aimer</h2>
        {/* Insérer ici un composant pour afficher des produits similaires */}
        <div className="text-center py-10 text-gray-500">
          Suggestions de produits similaires à implémenter
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
