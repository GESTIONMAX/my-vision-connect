
import { motion } from 'framer-motion';
import { Ticket, Plus, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const TicketSystem = () => {
  const tickets = [
    {
      id: '#TK-2024-001',
      title: 'Problème installation produit X',
      status: 'En cours',
      priority: 'Haute',
      created: '2024-01-15',
      category: 'Technique'
    },
    {
      id: '#TK-2024-002',
      title: 'Question tarification volume',
      status: 'Résolu',
      priority: 'Normale',
      created: '2024-01-14',
      category: 'Commercial'
    },
    {
      id: '#TK-2024-003',
      title: 'Formation équipe demandée',
      status: 'En attente',
      priority: 'Normale',
      created: '2024-01-13',
      category: 'Formation'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En cours':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" /> En cours</Badge>;
      case 'Résolu':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Résolu</Badge>;
      case 'En attente':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> En attente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute':
        return 'text-red-600';
      case 'Moyenne':
        return 'text-orange-600';
      case 'Normale':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Système de Tickets
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Suivez vos demandes de support en temps réel
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Vos tickets récents
            </h3>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau ticket
            </Button>
          </div>

          <div className="space-y-4">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-2 flex items-center">
                          <Ticket className="h-5 w-5 mr-2 text-blue-500" />
                          {ticket.id}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">
                          {ticket.title}
                        </p>
                      </div>
                      {getStatusBadge(ticket.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex space-x-4">
                        <span>Catégorie: {ticket.category}</span>
                        <span className={`font-medium ${getPriorityColor(ticket.priority)}`}>
                          Priorité: {ticket.priority}
                        </span>
                      </div>
                      <span>Créé le {ticket.created}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
