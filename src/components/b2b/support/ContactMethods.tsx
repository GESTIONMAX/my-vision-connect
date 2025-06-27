
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const ContactMethods = () => {
  const { toast } = useToast();

  const handleContactClick = (type: string, contact: string) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${contact.replace(/\s/g, '')}`);
        break;
      case 'email':
        window.open(`mailto:${contact}`);
        break;
      case 'chat':
        toast({
          title: "Chat en cours d'ouverture",
          description: "Un agent va vous contacter dans quelques instants.",
        });
        break;
      default:
        break;
    }
  };

  const contactOptions = [
    {
      icon: Phone,
      title: 'Support Technique',
      description: 'Assistance pour installation et configuration',
      contact: '+33 1 23 45 67 89',
      hours: 'Lun-Ven 8h-18h',
      color: 'from-blue-500 to-blue-600',
      type: 'phone'
    },
    {
      icon: Mail,
      title: 'Support Commercial',
      description: 'Questions sur commandes et partenariat',
      contact: 'commercial@chamelo.fr',
      hours: 'Lun-Ven 9h-17h',
      color: 'from-purple-500 to-purple-600',
      type: 'email'
    },
    {
      icon: MessageCircle,
      title: 'Chat en Direct',
      description: 'Réponse immédiate à vos questions',
      contact: 'Démarrer le chat',
      hours: 'Lun-Sam 8h-20h',
      color: 'from-green-500 to-green-600',
      type: 'chat'
    }
  ];

  return (
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
                  <Button 
                    className={`w-full bg-gradient-to-r ${option.color} hover:shadow-lg`}
                    onClick={() => handleContactClick(option.type, option.contact)}
                  >
                    Contacter
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
