import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
}

export const PlaceholderPage = ({ 
  title, 
  description = "Cette page est en cours de développement.", 
  showBackButton = true 
}: PlaceholderPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full text-center px-4">
        <div className="mb-8">
          <Construction className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {description}
          </p>
        </div>
        
        {showBackButton && (
          <div className="space-y-4">
            <Link to="/">
              <Button className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" className="w-full">
                Voir nos produits
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant NotFound spécialisé
export const NotFound = () => (
  <PlaceholderPage 
    title="Page non trouvée" 
    description="La page que vous cherchez n'existe pas ou a été déplacée."
  />
);

// Composants placeholder pour les pages manquantes
export const B2C = () => (
  <PlaceholderPage 
    title="MyTechGear B2C" 
    description="Notre plateforme grand public arrive bientôt !"
  />
);

export const B2B = () => (
  <PlaceholderPage 
    title="MyTechGear B2B" 
    description="Solutions professionnelles pour entreprises - En développement"
  />
);

export const Technology = () => (
  <PlaceholderPage 
    title="Nos Technologies" 
    description="Découvrez nos innovations technologiques - Page en construction"
  />
);

export const FAQ = () => (
  <PlaceholderPage 
    title="Questions Fréquentes" 
    description="Toutes vos réponses arrivent bientôt !"
  />
);

export const Careers = () => (
  <PlaceholderPage 
    title="Rejoignez-nous" 
    description="Opportunités de carrière chez MyTechGear - Page en préparation"
  />
);

export const Blog = () => (
  <PlaceholderPage 
    title="Blog MyTechGear" 
    description="Actualités et conseils - Contenu à venir"
  />
);

export const BlogPost = () => (
  <PlaceholderPage 
    title="Article de blog" 
    description="Cet article n'est pas encore disponible."
  />
);

export const Auth = () => (
  <PlaceholderPage 
    title="Authentification" 
    description="Connexion et inscription - Interface en développement"
  />
);

export const Welcome = () => (
  <PlaceholderPage 
    title="Bienvenue" 
    description="Page de bienvenue personnalisée - En cours de création"
  />
);

export const Checkout = () => (
  <PlaceholderPage 
    title="Commande" 
    description="Processus de commande - Fonctionnalité en développement"
  />
);

export const B2BCatalog = () => (
  <PlaceholderPage 
    title="Catalogue B2B" 
    description="Catalogue professionnel - En préparation"
  />
);

export const B2BPartnership = () => (
  <PlaceholderPage 
    title="Partenariats B2B" 
    description="Programme de partenariat - Page en construction"
  />
);

export const B2BSupport = () => (
  <PlaceholderPage 
    title="Support B2B" 
    description="Support technique professionnel - Service à venir"
  />
);