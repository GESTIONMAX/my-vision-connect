
import { motion } from 'framer-motion';
import { Clock, Users, MessageCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SupportStats = () => {
  const stats = [
    {
      icon: Clock,
      title: 'Temps de réponse moyen',
      value: '< 2h',
      description: 'Réponse garantie en moins de 2 heures',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Experts disponibles',
      value: '24/7',
      description: 'Une équipe dédiée à votre disposition',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MessageCircle,
      title: 'Tickets résolus',
      value: '98%',
      description: 'Taux de résolution en première intervention',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: CheckCircle,
      title: 'Satisfaction client',
      value: '4.9/5',
      description: 'Note moyenne de nos partenaires',
      color: 'from-orange-500 to-orange-600'
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
            Notre Performance Support
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Des chiffres qui témoignent de notre engagement
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </CardTitle>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {stat.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.description}
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
