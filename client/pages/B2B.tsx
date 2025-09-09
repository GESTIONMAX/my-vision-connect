import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Users, 
  Package, 
  TrendingUp, 
  FileText, 
  Shield, 
  ChevronRight, 
  CheckCircle, 
  Download,
  ShoppingCart,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const B2B: React.FC = () => {
  const navigate = useNavigate();
  
  // Fonctionnalités B2B
  const features = [
    {
      icon: <Package size={24} />,
      title: 'Tarification spécifique',
      description: 'Bénéficiez de tarifs préférentiels et dégressifs selon vos volumes de commande.',
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Statistiques avancées',
      description: 'Suivez vos achats, analysez vos tendances et optimisez vos approvisionnements.',
    },
    {
      icon: <Users size={24} />,
      title: 'Multi-utilisateurs',
      description: 'Gérez plusieurs comptes avec différents niveaux d\'accès pour votre équipe.',
    },
    {
      icon: <FileText size={24} />,
      title: 'Factures et devis simplifiés',
      description: 'Générez facilement des devis personnalisés et accédez à toutes vos factures.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Contrats sur mesure',
      description: 'Bénéficiez d\'un accompagnement personnalisé et de conditions spéciales.',
    },
    {
      icon: <Building size={24} />,
      title: 'Gestion multi-sites',
      description: 'Administrez plusieurs sites de livraison et points de facturation.',
    }
  ];
  
  // Étapes du processus
  const steps = [
    {
      number: 1,
      title: 'Créez votre compte',
      description: 'Remplissez le formulaire d\'inscription avec vos informations professionnelles.'
    },
    {
      number: 2,
      title: 'Vérification & activation',
      description: 'Nous vérifions votre numéro SIRET et activons votre compte B2B.'
    },
    {
      number: 3,
      title: 'Configurez votre espace',
      description: 'Ajoutez vos adresses, utilisateurs et préférences de livraison.'
    },
    {
      number: 4,
      title: 'Commandez et suivez',
      description: 'Passez vos commandes, suivez vos livraisons et gérez vos factures.'
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Solutions professionnelles <span className="text-white">sur mesure</span>
              </h1>
              <p className="text-xl text-white mb-8 max-w-lg">
                Découvrez notre offre dédiée aux professionnels et bénéficiez d'avantages exclusifs adaptés à vos besoins.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-white text-indigo-600 hover:bg-blue-50 px-6 py-3 text-base font-medium shadow-md"
                  onClick={() => navigate('/b2b/register')}
                >
                  Créer un compte B2B
                </Button>
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 px-6 py-3 text-base font-medium"
                  onClick={() => navigate('/b2b/login')}
                >
                  Se connecter
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative bg-white/30 p-6 rounded-xl backdrop-blur-sm border border-white/40 shadow-lg">
                <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-sm px-4 py-1 rounded-full">
                  Espace Professionnel
                </div>
                <img 
                  src="https://placehold.co/600x400?text=B2B+Dashboard+Preview" 
                  alt="Dashboard B2B Preview" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités B2B */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Une expérience B2B complète</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Notre plateforme B2B vous offre tous les outils nécessaires pour optimiser votre relation commerciale avec nous.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Comment ça marche */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Devenir client B2B chez nous est simple et rapide. Suivez ces quelques étapes pour commencer.
            </p>
          </div>
          
          <div className="relative">
            {/* Ligne de connexion */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
            
            {/* Étapes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-slate-800 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Découvrez ce que nos clients B2B pensent de notre service et de nos produits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "La plateforme B2B a considérablement simplifié notre processus d'approvisionnement. Nous économisons du temps et de l'argent à chaque commande.",
                author: "Marie Dubois",
                position: "Directrice Achats, Entreprise A"
              },
              {
                quote: "Le service client est exceptionnel. Les livraisons sont toujours à l'heure et la qualité des produits est constante.",
                author: "Thomas Martin",
                position: "CEO, Entreprise B"
              },
              {
                quote: "Les fonctionnalités de gestion multi-utilisateurs nous permettent d'avoir un meilleur contrôle sur nos dépenses et nos commandes.",
                author: "Sophie Leclerc",
                position: "Responsable Logistique, Entreprise C"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 relative"
              >
                <div className="text-4xl text-slate-200 absolute top-4 left-4">"</div>
                <p className="text-slate-700 mb-6 relative z-10">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="bg-slate-100 w-12 h-12 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-slate-500">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à améliorer votre expérience d'achat professionnel ?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Rejoignez notre réseau de clients B2B et accédez à des fonctionnalités exclusives pour votre entreprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-slate-800 hover:bg-slate-100 px-6 py-3 text-base"
              onClick={() => navigate('/b2b/register')}
            >
              Créer un compte B2B
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-6 py-3 text-base"
              onClick={() => navigate('/b2b/catalog')}
            >
              Découvrir notre catalogue <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Documents et ressources</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Téléchargez nos documents commerciaux et découvrez nos conditions B2B.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Conditions générales B2B", 
                description: "Nos conditions spécifiques pour les clients professionnels",
                fileType: "PDF", 
                fileSize: "1.2 MB" 
              },
              { 
                title: "Catalogue produits 2025", 
                description: "Notre catalogue complet avec tarifs professionnels",
                fileType: "PDF", 
                fileSize: "5.8 MB" 
              },
              { 
                title: "Guide de commande B2B", 
                description: "Comment utiliser notre plateforme B2B efficacement",
                fileType: "PDF", 
                fileSize: "3.4 MB" 
              }
            ].map((doc, index) => (
              <div 
                key={index}
                className="flex p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="bg-slate-100 p-4 rounded-lg mr-4">
                  <FileText size={32} className="text-slate-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{doc.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{doc.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{doc.fileType} · {doc.fileSize}</span>
                    <Button variant="ghost" size="sm" className="flex items-center text-slate-700">
                      <Download size={14} className="mr-1" /> Télécharger
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ B2B */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Questions fréquentes B2B</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Retrouvez les réponses aux questions les plus fréquemment posées par nos clients professionnels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Comment obtenir un compte B2B ?",
                answer: "Pour obtenir un compte B2B, complétez le formulaire d'inscription en fournissant votre numéro SIRET et vos documents commerciaux. Notre équipe vérifiera votre demande sous 24 à 48h ouvrées."
              },
              {
                question: "Quels sont les avantages d'un compte B2B ?",
                answer: "Les comptes B2B bénéficient de tarifs préférentiels, de conditions de paiement étendues, d'un gestionnaire de compte dédié, et d'outils spécifiques pour gérer vos commandes en volume."
              },
              {
                question: "Quels sont les délais de livraison pour les commandes B2B ?",
                answer: "Les délais standards sont de 3 à 5 jours ouvrés. Pour les commandes volumineuses, un planning personnalisé peut être établi avec votre gestionnaire de compte."
              },
              {
                question: "Comment effectuer une commande en gros ?",
                answer: "Connectez-vous à votre espace B2B, ajoutez les produits au panier, spécifiez les quantités et validez votre commande. Pour les très grandes quantités, un devis peut être généré automatiquement."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
              >
                <h3 className="text-lg font-semibold mb-3 flex items-start">
                  <span className="text-blue-500 mr-2">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-slate-600 pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/faq" className="inline-flex items-center text-slate-700 font-medium hover:text-slate-900">
              Voir toutes nos FAQ <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default B2B;
