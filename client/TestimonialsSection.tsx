
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Marie Dubois",
      role: "Opticienne à Paris",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      content: "Depuis que j'ai intégré EUROGLOBAL dans mon magasin, mes clients sont enthousiastes. La technologie est révolutionnaire et le support technique exceptionnel.",
      rating: 5,
      location: "Paris, France"
    },
    {
      name: "Jean-Pierre Martin",
      role: "Client satisfait",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "Ces lunettes ont changé ma vie ! Plus besoin de jongler entre mes lunettes de soleil et mes lunettes de lecture. L'adaptation est instantanée.",
      rating: 5,
      location: "Lyon, France"
    },
    {
      name: "Sophie Bernard",
      role: "Développeuse web",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: "Enfin des lunettes qui comprennent mon rythme de travail ! Protection parfaite contre la lumière bleue et adaptation automatique. Un must-have !",
      rating: 5,
      location: "Marseille, France"
    },
    {
      name: "Michel Leroy",
      role: "Gérant d'optique",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "En tant que professionnel, je recommande EUROGLOBAL sans hésitation. La qualité, l'innovation et le service client sont au rendez-vous.",
      rating: 5,
      location: "Toulouse, France"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez les témoignages de ceux qui ont adopté nos lunettes intelligentes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {testimonial.location}
                      </p>
                    </div>
                    <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400 opacity-50" />
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
