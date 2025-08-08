
import { motion } from 'framer-motion';
import { FileText, Download, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const SupportResources = () => {
  const { toast } = useToast();

  const handleGuideDownload = (guideName: string) => {
    toast({
      title: "Téléchargement en cours",
      description: `Le guide "${guideName}" va être téléchargé.`,
    });
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Téléchargement terminé",
        description: `Le guide "${guideName}" a été téléchargé avec succès.`,
      });
    }, 2000);
  };

  const handleCTAClick = (action: string) => {
    if (action === 'contact') {
      toast({
        title: "Contact de l'équipe pro",
        description: "Vous allez être redirigé vers notre formulaire de contact.",
      });
    } else if (action === 'download') {
      toast({
        title: "Téléchargement des guides",
        description: "Préparation du pack complet des guides...",
      });
    }
  };

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

  return (
    <>
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
                    <Button 
                      className="w-full group-hover:bg-blue-600 transition-colors"
                      onClick={() => handleGuideDownload(guide.title)}
                    >
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
                onClick={() => handleCTAClick('contact')}
              >
                <Headphones className="mr-2 h-5 w-5" />
                Contacter l'équipe pro
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold"
                onClick={() => handleCTAClick('download')}
              >
                <Download className="mr-2 h-5 w-5" />
                Télécharger les guides
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
