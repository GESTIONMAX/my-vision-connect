import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Plus, Minus, Info, ShoppingBag, Truck, CreditCard, RotateCcw, MessageSquare, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types pour les FAQ
interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  popular?: boolean;
}

const FAQ: React.FC = () => {
  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  // Catégories de FAQ
  const categories: FAQCategory[] = [
    {
      id: 'commande',
      name: 'Commandes',
      icon: <ShoppingBag size={24} />,
      description: 'Questions sur le processus de commande'
    },
    {
      id: 'livraison',
      name: 'Livraison',
      icon: <Truck size={24} />,
      description: 'Tout sur les délais et options de livraison'
    },
    {
      id: 'paiement',
      name: 'Paiement',
      icon: <CreditCard size={24} />,
      description: 'Informations sur les méthodes de paiement et sécurité'
    },
    {
      id: 'retour',
      name: 'Retours',
      icon: <RotateCcw size={24} />,
      description: 'Politique et procédure des retours et remboursements'
    },
    {
      id: 'produit',
      name: 'Produits',
      icon: <Heart size={24} />,
      description: 'Questions sur nos produits et garanties'
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: <MessageSquare size={24} />,
      description: 'Comment nous contacter pour une assistance personnalisée'
    }
  ];
  
  // Questions fréquentes
  const faqItems: FAQItem[] = [
    {
      id: 'q1',
      question: 'Comment suivre ma commande ?',
      answer: 'Vous pouvez suivre votre commande à tout moment en vous connectant à votre compte et en accédant à la section "Mes commandes". Vous y trouverez un numéro de suivi et un lien direct vers le service de livraison pour connaître l\'emplacement précis de votre colis.',
      category: 'commande',
      popular: true
    },
    {
      id: 'q2',
      question: 'Quels sont les délais de livraison ?',
      answer: 'Les délais de livraison standards sont de 2 à 5 jours ouvrables en France métropolitaine. Pour les livraisons internationales, comptez 5 à 10 jours ouvrables selon la destination. Une option de livraison express est également disponible pour une réception sous 24 à 48 heures (supplément applicable).',
      category: 'livraison',
      popular: true
    },
    {
      id: 'q3',
      question: 'Comment modifier ma commande ?',
      answer: 'Vous pouvez modifier votre commande dans les 30 minutes suivant sa validation depuis votre espace client. Au-delà, veuillez contacter notre service client par email à support@visionconnect.com ou par téléphone au 01 23 45 67 89 dès que possible.',
      category: 'commande'
    },
    {
      id: 'q4',
      question: 'Quelles sont les méthodes de paiement acceptées ?',
      answer: 'Nous acceptons les cartes de crédit (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, ainsi que les virements bancaires pour les commandes professionnelles. Tous les paiements sont sécurisés avec un cryptage SSL 256 bits.',
      category: 'paiement',
      popular: true
    },
    {
      id: 'q5',
      question: 'Comment retourner un produit ?',
      answer: 'Vous disposez de 30 jours à compter de la réception pour retourner un produit. Connectez-vous à votre compte, accédez à "Mes commandes", sélectionnez la commande concernée et cliquez sur "Retourner un article". Suivez ensuite les instructions pour générer une étiquette de retour prépayée.',
      category: 'retour',
      popular: true
    },
    {
      id: 'q6',
      question: 'Quelles sont les garanties sur les produits ?',
      answer: 'Tous nos produits sont garantis 2 ans contre les défauts de fabrication. Certaines gammes premium bénéficient d\'une garantie étendue à 5 ans. Les conditions détaillées sont disponibles sur la fiche de chaque produit et dans votre espace client.',
      category: 'produit'
    },
    {
      id: 'q7',
      question: 'La livraison est-elle gratuite ?',
      answer: 'La livraison est gratuite pour toute commande supérieure à 49€ en France métropolitaine. En dessous de ce montant, des frais de livraison de 5,90€ sont appliqués. Pour les livraisons internationales, les frais varient selon le pays de destination.',
      category: 'livraison'
    },
    {
      id: 'q8',
      question: 'Comment contacter le service client ?',
      answer: 'Notre service client est disponible du lundi au vendredi de 9h à 18h par email à support@visionconnect.com, par téléphone au 01 23 45 67 89 ou via le chat en direct sur notre site. Notre temps de réponse moyen est de 2 heures pendant nos heures d\'ouverture.',
      category: 'contact',
      popular: true
    },
    {
      id: 'q9',
      question: 'Puis-je annuler ma commande ?',
      answer: 'Vous pouvez annuler votre commande tant qu\'elle n\'est pas en cours de préparation. Pour ce faire, connectez-vous à votre compte, accédez à "Mes commandes" et cliquez sur "Annuler" si cette option est disponible. Sinon, contactez rapidement notre service client.',
      category: 'commande'
    },
    {
      id: 'q10',
      question: 'Comment fonctionnent les remboursements ?',
      answer: 'Une fois votre retour reçu et validé, le remboursement est effectué sur le moyen de paiement utilisé lors de l\'achat. Le délai est de 5 à 10 jours ouvrables selon votre banque. Vous recevrez un email de confirmation dès que le remboursement sera effectué.',
      category: 'retour'
    },
    {
      id: 'q11',
      question: 'Les paiements en plusieurs fois sont-ils possibles ?',
      answer: 'Oui, pour les commandes supérieures à 100€, nous proposons le paiement en 3 ou 4 fois sans frais via notre partenaire Alma. Cette option est disponible lors du choix du mode de paiement à l\'étape de validation de votre commande.',
      category: 'paiement'
    },
    {
      id: 'q12',
      question: 'Comment savoir si un produit est disponible en stock ?',
      answer: 'La disponibilité des produits est indiquée en temps réel sur chaque fiche produit. Un produit affichant "En stock" est prêt à être expédié. Pour les produits en rupture, vous pouvez vous inscrire à une alerte de disponibilité par email.',
      category: 'produit'
    },
  ];
  
  // Filtrer les FAQ selon la recherche et la catégorie
  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === null || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Gestion de l'ouverture/fermeture des questions
  const toggleItem = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((itemId) => itemId !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 bg-blue-50">
      {/* Hero section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Comment pouvons-nous vous aider ?
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Trouvez rapidement des réponses à vos questions grâce à notre centre d'aide complet.
        </p>
        
        {/* Barre de recherche */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-blue-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>
      
      {/* Catégories de FAQ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            className={`flex items-center p-4 rounded-xl transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg transform scale-[1.02]'
                : 'bg-white text-slate-800 border border-blue-100 hover:bg-blue-50'
            }`}
          >
            <div className={`p-3 rounded-full mr-4 ${
              selectedCategory === category.id
                ? 'bg-blue-700 text-white'
                : 'bg-blue-100 text-blue-600'
            }`}>
              {category.icon}
            </div>
            <div className="text-left">
              <h3 className="font-semibold">{category.name}</h3>
              <p className={`text-sm ${
                selectedCategory === category.id ? 'text-slate-300' : 'text-slate-500'
              }`}>
                {category.description}
              </p>
            </div>
          </button>
        ))}
      </div>
      
      {/* Questions populaires */}
      {searchQuery === '' && selectedCategory === null && (
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-6">
            <Info size={20} className="text-slate-600" />
            <h2 className="text-2xl font-bold text-slate-800">Questions populaires</h2>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
            {faqItems
              .filter(item => item.popular)
              .map((item, index, array) => (
                <div key={item.id} className="border-b border-slate-100 last:border-0">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-5 flex justify-between items-center hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="font-medium text-slate-800">{item.question}</span>
                    {openItems.includes(item.id) ? (
                      <Minus size={18} className="text-slate-600 flex-shrink-0" />
                    ) : (
                      <Plus size={18} className="text-slate-600 flex-shrink-0" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {openItems.includes(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4 bg-slate-50/50 text-slate-600">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
          </div>
        </div>
      )}
      
      {/* Liste des FAQ filtrées */}
      <div className="mb-12">
        {selectedCategory !== null && (
          <div className="flex items-center space-x-2 mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {categories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-slate-500 hover:text-slate-800 underline"
            >
              Afficher toutes les catégories
            </button>
          </div>
        )}
        
        {filteredFAQs.length > 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
            {filteredFAQs.map((item, index) => (
              <div key={item.id} className="border-b border-blue-50 last:border-0">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-5 flex justify-between items-center hover:bg-blue-50 transition-colors text-left"
                >
                  <span className="font-medium text-slate-800">{item.question}</span>
                  {openItems.includes(item.id) ? (
                    <Minus size={18} className="text-blue-600 flex-shrink-0" />
                  ) : (
                    <Plus size={18} className="text-blue-600 flex-shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openItems.includes(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-slate-50/50 text-slate-600">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-slate-100 mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-medium text-slate-800 mb-2">Aucun résultat trouvé</h3>
            <p className="text-slate-500">
              Essayez d'utiliser d'autres mots-clés ou de parcourir nos catégories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="mt-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-md text-slate-700 transition-colors"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}
      </div>
      
      {/* Section contact */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-8 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Vous n'avez pas trouvé la réponse que vous cherchiez ?</h2>
            <p className="text-slate-300 mb-6">
              Notre équipe de support client est là pour vous aider avec toutes vos questions.
              N'hésitez pas à nous contacter par email, téléphone ou chat en direct.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-full bg-white text-slate-800 font-medium hover:bg-slate-100 transition-colors"
            >
              <MessageSquare size={18} className="mr-2" />
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
