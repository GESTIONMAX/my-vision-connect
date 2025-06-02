
import { motion } from 'framer-motion';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  Glasses, 
  Shield, 
  Truck, 
  CreditCard, 
  Settings,
  Phone,
  Mail
} from 'lucide-react';

const FAQ = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const productFAQ = [
    {
      question: "Comment fonctionnent les lunettes Chamelo ?",
      answer: "Les lunettes Chamelo utilisent une technologie de teinte électronique avancée qui s'adapte automatiquement à la luminosité ambiante. Grâce à des capteurs intégrés et un système de contrôle intelligent, les verres changent d'opacité en temps réel pour offrir un confort visuel optimal."
    },
    {
      question: "Quelle est l'autonomie de la batterie ?",
      answer: "L'autonomie varie selon le modèle : Chamelo Classic offre jusqu'à 24h d'utilisation continue, Chamelo Pro jusqu'à 48h, et Chamelo Elite jusqu'à 72h. La recharge complète prend environ 2h via USB-C."
    },
    {
      question: "Les lunettes sont-elles étanches ?",
      answer: "Oui, toutes nos lunettes Chamelo bénéficient d'une certification IP65, les protégeant contre la poussière et les projections d'eau. Elles résistent aux conditions météorologiques normales."
    },
    {
      question: "Peut-on adapter des verres correcteurs ?",
      answer: "Absolument ! Nos lunettes sont compatibles avec tous types de verres correcteurs. Nos opticiens partenaires peuvent adapter vos corrections habituelles sur les montures Chamelo."
    },
    {
      question: "Comment nettoyer les verres électroniques ?",
      answer: "Utilisez un chiffon microfibre légèrement humide avec de l'eau tiède. Évitez les produits chimiques agressifs. Un kit de nettoyage spécialisé est inclus avec chaque paire."
    }
  ];

  const technicalFAQ = [
    {
      question: "Les lunettes sont-elles compatibles avec tous les smartphones ?",
      answer: "Oui, l'application Chamelo est disponible sur iOS (version 12+) et Android (version 8+). La connexion se fait via Bluetooth 5.0 pour une compatibilité maximale."
    },
    {
      question: "Que faire si la connexion Bluetooth ne fonctionne pas ?",
      answer: "Vérifiez que le Bluetooth est activé, redémarrez l'application, puis maintenez le bouton de la monture pendant 3 secondes pour réinitialiser la connexion. Si le problème persiste, contactez notre support technique."
    },
    {
      question: "Peut-on utiliser les lunettes sans smartphone ?",
      answer: "Oui, les lunettes fonctionnent en mode automatique sans smartphone. L'application permet simplement un contrôle plus précis et l'accès aux statistiques d'utilisation."
    },
    {
      question: "Les lunettes émettent-elles des ondes dangereuses ?",
      answer: "Non, nos lunettes respectent toutes les normes européennes de sécurité. Les émissions Bluetooth sont 1000 fois inférieures aux limites autorisées et la technologie de teinte est purement optique."
    }
  ];

  const warrantyFAQ = [
    {
      question: "Quelle est la durée de garantie ?",
      answer: "Nous offrons une garantie de 2 ans sur tous nos produits Chamelo, couvrant les défauts de fabrication et les dysfonctionnements électroniques. La garantie s'étend à 3 ans pour les modèles Pro et Elite."
    },
    {
      question: "Que couvre exactement la garantie ?",
      answer: "La garantie couvre tous les composants électroniques, la monture, les verres, et inclut une réparation ou un remplacement gratuit. Les dommages accidentels ne sont pas couverts sauf si vous avez souscrit à notre assurance optionnelle."
    },
    {
      question: "Comment faire une demande de garantie ?",
      answer: "Contactez notre service client avec votre numéro de série et une description du problème. Nous vous fournirons un numéro de retour et prendrons en charge les frais d'expédition."
    },
    {
      question: "Puis-je échanger ma paire si elle ne me convient pas ?",
      answer: "Oui, vous disposez de 30 jours pour échanger ou retourner votre paire si elle ne vous convient pas, à condition qu'elle soit en parfait état avec tous les accessoires d'origine."
    }
  ];

  const shippingFAQ = [
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Livraison standard en France : 2-3 jours ouvrés. Express : 24h. International : 5-7 jours ouvrés. Les commandes passées avant 14h sont expédiées le jour même."
    },
    {
      question: "Quels sont les frais de livraison ?",
      answer: "Livraison gratuite en France métropolitaine dès 299€. Sinon 9,90€ en standard, 19,90€ en express. International : variable selon destination."
    },
    {
      question: "Puis-je suivre ma commande ?",
      answer: "Oui, vous recevrez un numéro de suivi par email dès l'expédition. Vous pouvez également suivre votre commande dans votre espace client sur notre site."
    },
    {
      question: "Livrez-vous en point relais ?",
      answer: "Oui, nous proposons la livraison en point relais Mondial Relay et Chronopost partout en France pour plus de flexibilité."
    }
  ];

  const paymentFAQ = [
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes bancaires (Visa, MasterCard, American Express), PayPal, virement bancaire, et le paiement en plusieurs fois sans frais avec Klarna."
    },
    {
      question: "Le paiement est-il sécurisé ?",
      answer: "Absolument. Nous utilisons le cryptage SSL 256 bits et nos partenaires de paiement sont certifiés PCI DSS. Vos données bancaires ne sont jamais stockées sur nos serveurs."
    },
    {
      question: "Puis-je payer en plusieurs fois ?",
      answer: "Oui, nous proposons le paiement en 3x ou 4x sans frais dès 300€ d'achat via Klarna. Les échéances sont automatiquement prélevées sur votre carte."
    },
    {
      question: "Puis-je obtenir une facture ?",
      answer: "Oui, une facture est automatiquement générée et envoyée par email après chaque commande. Les professionnels peuvent obtenir une facture avec TVA déductible."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Foire Aux Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Trouvez rapidement des réponses à vos questions sur nos lunettes connectées Chamelo, 
              la livraison, la garantie et bien plus encore.
            </p>
          </motion.div>

          {/* FAQ Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="produits" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
                <TabsTrigger value="produits" className="flex items-center gap-2">
                  <Glasses className="h-4 w-4" />
                  <span className="hidden sm:inline">Produits</span>
                </TabsTrigger>
                <TabsTrigger value="technique" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Technique</span>
                </TabsTrigger>
                <TabsTrigger value="garantie" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Garantie</span>
                </TabsTrigger>
                <TabsTrigger value="livraison" className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span className="hidden sm:inline">Livraison</span>
                </TabsTrigger>
                <TabsTrigger value="paiement" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Paiement</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="produits">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Glasses className="h-5 w-5 text-blue-600" />
                      Questions sur les produits Chamelo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {productFAQ.map((faq, index) => (
                        <AccordionItem key={index} value={`product-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 dark:text-gray-300">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technique">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-blue-600" />
                      Support technique
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {technicalFAQ.map((faq, index) => (
                        <AccordionItem key={index} value={`technical-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 dark:text-gray-300">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="garantie">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Garantie et SAV
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {warrantyFAQ.map((faq, index) => (
                        <AccordionItem key={index} value={`warranty-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 dark:text-gray-300">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="livraison">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-blue-600" />
                      Livraison et expédition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {shippingFAQ.map((faq, index) => (
                        <AccordionItem key={index} value={`shipping-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 dark:text-gray-300">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="paiement">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      Paiement et facturation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {paymentFAQ.map((faq, index) => (
                        <AccordionItem key={index} value={`payment-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 dark:text-gray-300">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    Vous ne trouvez pas la réponse à votre question ?
                  </h2>
                  <p className="text-blue-100 mb-6">
                    Notre équipe d'experts est là pour vous aider. Contactez-nous directement.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="secondary" 
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Appeler le support
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Envoyer un email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
