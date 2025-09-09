
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const FAQ = () => {
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
  );
};
