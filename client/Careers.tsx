
import { motion } from 'framer-motion';
import { MapPin, Users, TrendingUp, Award, Send, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Careers = () => {
  const positions = [
    {
      country: 'France',
      flag: '🇫🇷',
      description: 'Développement du réseau commercial français',
      requirements: ['Expérience optique/sport', 'Réseau établi', 'Mobilité nationale'],
    },
    {
      country: 'Italie',
      flag: '🇮🇹',
      description: 'Expansion sur le marché italien',
      requirements: ['Bilingue italien', 'Connaissance marché local', 'Expérience B2B'],
    },
    {
      country: 'Bénélux',
      flag: '🇧🇪🇳🇱🇱🇺',
      description: 'Couverture Belgique, Pays-Bas, Luxembourg',
      requirements: ['Multilinguisme', 'Réseau Bénélux', 'Autonomie'],
    },
    {
      country: 'Espagne',
      flag: '🇪🇸',
      description: 'Développement marché espagnol',
      requirements: ['Espagnol natif', 'Expérience terrain', 'Dynamisme commercial'],
    },
  ];

  const advantages = [
    {
      icon: TrendingUp,
      title: 'Commissions attractives',
      description: 'Structure de rémunération évolutive avec bonus performance'
    },
    {
      icon: Users,
      title: 'Formation complète',
      description: 'Formation produits et techniques de vente assurée'
    },
    {
      icon: Award,
      title: 'Marque innovante',
      description: 'Représentez une technologie révolutionnaire'
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
              Recrutement Agents Commerciaux
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Rejoignez EUROGLOBAL TRADING DISTRIBUTION et développez le marché européen 
              des lunettes intelligentes Chamelo
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>4 pays à couvrir</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <TrendingUp className="h-5 w-5 mr-2" />
                <span>Marché en croissance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Positions Available */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Postes à Pourvoir
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Devenez notre ambassadeur commercial dans votre région
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {positions.map((position, index) => (
              <motion.div
                key={position.country}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 text-center">
                  <CardHeader>
                    <div className="text-4xl mb-4">{position.flag}</div>
                    <CardTitle className="text-xl">{position.country}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {position.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Profil recherché :</h4>
                      <ul className="text-sm space-y-1">
                        {position.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Advantages */}
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <advantage.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Candidater
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Envoyez-nous votre candidature pour rejoindre notre équipe
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Formulaire de candidature</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input id="phone" type="tel" placeholder="+33 6 12 34 56 78" />
                </div>

                <div>
                  <Label htmlFor="country">Pays d'intérêt *</Label>
                  <select 
                    id="country" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Sélectionnez un pays</option>
                    <option value="france">🇫🇷 France</option>
                    <option value="italie">🇮🇹 Italie</option>
                    <option value="benelux">🇧🇪🇳🇱🇱🇺 Bénélux</option>
                    <option value="espagne">🇪🇸 Espagne</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="experience">Expérience professionnelle *</Label>
                  <Textarea 
                    id="experience" 
                    placeholder="Décrivez votre expérience dans la vente, l'optique ou le sport..."
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="motivation">Lettre de motivation *</Label>
                  <Textarea 
                    id="motivation" 
                    placeholder="Expliquez votre motivation pour rejoindre notre équipe..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer ma candidature
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="mt-12 text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Questions ? Contactez-nous
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div className="flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-300">+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-300">recrutement@euroglobal.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
