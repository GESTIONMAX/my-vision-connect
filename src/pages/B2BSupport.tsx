
import { motion } from 'framer-motion';
import { Headphones, FileText, Download, Phone, Mail, MessageCircle, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const B2BSupport = () => {
  const contactOptions = [
    {
      icon: Phone,
      title: 'Support Technique',
      description: 'Assistance pour installation et configuration',
      contact: '+33 1 23 45 67 89',
      hours: 'Lun-Ven 8h-18h',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Support Commercial',
      description: 'Questions sur commandes et partenariat',
      contact: 'commercial@chamelo.fr',
      hours: 'Lun-Ven 9h-17h',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageCircle,
      title: 'Chat en Direct',
      description: 'Réponse immédiate à vos questions',
      contact: 'Démarrer le chat',
      hours: 'Lun-Sam 8h-20h',
      color: 'from-green-500 to-green-600'
    }
  ];

  const guides = [
    {
      title: 'Guide d\'installation',
      description: 'Procédures complètes d\'installation et configuration',
      size: '2.1 MB',
      pages: 24
    },
    {
      title: 'Manuel de vente',
      description: 'Argumentaires et techniques de vente',
      size: '1.8 MB',
      pages: 18
    },
    {
      title: 'Formation technique',
      description: 'Support de formation pour votre équipe',
      size: '4.2 MB',
      pages: 56
    },
    {
      title: 'Troubleshooting',
      description: 'Guide de résolution des problèmes courants',
      size: '1.2 MB',
      pages: 16
    }
  ];

  const faqItems = [
    {
      question: 'Comment intégrer les produits Chamelo dans mon magasin ?',
      answer: 'Notre équipe vous accompagne dans l\'intégration avec un kit de présentation gratuit, une formation de votre équipe et un support dédié pendant les premiers mois.'
    },
    {
      question: 'Quelles sont les conditions de garantie pour mes clients ?',
      answer: 'Tous nos produits bénéficient d\'une garantie de 2 ans pièces et main d\'œuvre. En cas de problème, nous gérons directement le SAV avec vos clients.'
    },
    {
      question: 'Comment fonctionne la formation de mon équipe ?',
      answer: 'Nous proposons une formation complète en 2 parties : technique (2 jours) et commerciale (1 jour). La formation peut se faire dans nos locaux ou directement chez vous.'
    },
    {
      question: 'Quel est le délai de livraison des commandes ?',
      answer: 'Les produits en stock sont livrés sous 24/48h. Pour les commandes spéciales ou personnalisées, le délai est de 5 à 10 jours ouvrés.'
    },
    {
      question: 'Comment accéder aux tarifs préférentiels ?',
      answer: 'Une fois votre candidature acceptée, vous recevez vos identifiants pour accéder à notre plateforme B2B avec tous les tarifs préférentiels.'
    },
    {
      question: 'Y a-t-il un minimum de commande ?',
      answer: 'Aucun minimum de commande n\'est requis. Cependant, des remises dégressives s\'appliquent selon les volumes commandés.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Support Professionnel
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Une équipe d'experts dédiée pour vous accompagner dans votre succès
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <Clock className="h-5 w-5 mr-2" />
                <span>Support 24/7</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <Users className="h-5 w-5 mr-2" />
                <span>Équipe dédiée</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contactez Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Plusieurs moyens de nous joindre selon vos besoins
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">{option.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {option.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                      <div className="font-semibold text-gray-900 dark:text-white mb-2">
                        {option.contact}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {option.hours}
                      </div>
                    </div>
                    <Button className={`w-full bg-gradient-to-r ${option.color} hover:shadow-lg`}>
                      Contacter
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              FAQ Opticiens
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Réponses aux questions les plus fréquentes de nos partenaires
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem 
                    value={`item-${index}`}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg px-6 bg-gray-50 dark:bg-gray-900"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Guides et Documentation
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Toutes les ressources pour optimiser votre partenariat
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg mb-2">{guide.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {guide.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <span>{guide.pages} pages</span>
                      <span>•</span>
                      <span>{guide.size}</span>
                    </div>
                    <Button className="w-full group-hover:bg-blue-600 transition-colors">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Besoin d'Aide Supplémentaire ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Notre équipe professionnelle est là pour vous accompagner à chaque étape
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              >
                <Headphones className="mr-2 h-5 w-5" />
                Contacter l'équipe pro
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold"
              >
                <Download className="mr-2 h-5 w-5" />
                Télécharger les guides
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default B2BSupport;
