
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Comment fonctionnent les lunettes Chamelo ?",
      answer: "Les lunettes Chamelo utilisent une technologie de teinte électronique qui s'adapte automatiquement à la luminosité. Les verres changent d'opacité en temps réel grâce à des capteurs intégrés."
    },
    {
      question: "Quelle est l'autonomie de la batterie ?",
      answer: "L'autonomie varie selon le modèle : Classic (24h), Pro (48h), Elite (72h). Recharge complète en 2h via USB-C."
    },
    {
      question: "Puis-je adapter mes verres correcteurs ?",
      answer: "Oui, toutes nos montures sont compatibles avec vos corrections habituelles. Nos opticiens partenaires peuvent les adapter."
    },
    {
      question: "Les lunettes sont-elles étanches ?",
      answer: "Oui, certification IP65. Résistantes à la poussière et aux projections d'eau pour un usage quotidien."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Livraison standard 2-3 jours en France, Express 24h. Livraison gratuite dès 299€."
    },
    {
      question: "Puis-je retourner ma paire si elle ne convient pas ?",
      answer: "Oui, 30 jours pour échanger ou retourner votre paire en parfait état avec tous les accessoires."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tout ce que vous devez savoir sur nos lunettes intelligentes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 px-6"
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3"
            >
              Voir toutes les FAQ
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
