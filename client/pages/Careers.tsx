import React from 'react';
import { Mail, MapPin, Phone, ArrowRight, TrendingUp, Users, Award, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/card';
import ReactCountryFlag from "react-country-flag";

const Careers = () => {
    const positions = [
      {
        country: 'France',
        countryCode: 'FR',
        flag: '🇫🇷',
        description: 'Développement du réseau commercial français',
        requirements: ['Expérience optique/sport', 'Réseau établi', 'Mobilité nationale'],
      },
      {
        country: 'Italie',
        countryCode: 'IT',
        flag: '🇮🇹',
        description: 'Expansion sur le marché italien',
        requirements: ['Bilingue italien', 'Connaissance marché local', 'Expérience B2B'],
      },
      {
        country: 'Bénélux',
        countryCode: 'BE',
        flag: '🇧🇪🇳🇱🇱🇺',
        description: 'Couverture Belgique, Pays-Bas, Luxembourg',
        requirements: ['Multilinguisme', 'Réseau Bénélux', 'Autonomie'],
      },
      {
        country: 'Espagne',
        countryCode: 'ES',
        flag: '🇪🇸',
        description: 'Développement marché espagnol',
        requirements: ['Espagnol natif', 'Expérience terrain', 'Dynamisme commercial'],
      },
    ];
  
    const advantages = [
      {
        icon: <TrendingUp className="h-8 w-8 text-white" />,
        title: 'Commissions attractives',
        description: 'Structure de rémunération évolutive avec bonus performance'
      },
      {
        icon: <Users className="h-8 w-8 text-white" />,
        title: 'Formation complète',
        description: 'Formation produits et techniques de vente assurée'
      },
      {
        icon: <Award className="h-8 w-8 text-white" />,
        title: 'Marque innovante',
        description: 'Représentez une technologie révolutionnaire'
      }
    ];
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Recrutement Agents Commerciaux
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Rejoignez MyVisionConnect et développez le marché européen 
                des lunettes intelligentes
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
            </div>
          </div>
        </section>

        {/* Positions Available */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Postes à Pourvoir
              </h2>
              <p className="text-xl text-gray-600">
                Devenez notre ambassadeur commercial dans votre région
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {positions.map((position, index) => (
                <div
                  key={position.country}
                  className="h-full animate-fadeIn"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 text-center">
                    <CardHeader>
                      <div className="text-4xl mb-4 flex justify-center">
                        {position.flag}
                        <ReactCountryFlag 
                          countryCode={position.countryCode} 
                          svg 
                          style={{ width: '2em', height: '2em', display: 'none' }} 
                        />
                      </div>
                      <CardTitle className="text-xl">{position.country}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        {position.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Profil recherché :</h4>
                        <ul className="text-sm space-y-1">
                          {position.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-center text-gray-600">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            {/* Advantages */}
            <div className="grid md:grid-cols-3 gap-8 my-16">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="text-center animate-fadeIn"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12 animate-fadeIn">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Candidater
                </h2>
                <p className="text-xl text-gray-600">
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
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                      <input 
                        id="firstName" 
                        placeholder="Votre prénom" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                      <input 
                        id="lastName" 
                        placeholder="Votre nom" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input 
                      id="email" 
                      type="email" 
                      placeholder="votre@email.com" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                    <input 
                      id="phone" 
                      type="tel" 
                      placeholder="+33 6 12 34 56 78" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Pays d'intérêt *</label>
                    <select 
                      id="country" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez un pays</option>
                      <option value="france">🇫🇷 France</option>
                      <option value="italie">🇮🇹 Italie</option>
                      <option value="benelux">🇧🇪 Bénélux</option>
                      <option value="espagne">🇪🇸 Espagne</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Expérience professionnelle *</label>
                    <textarea 
                      id="experience" 
                      placeholder="Décrivez votre expérience dans la vente, l'optique ou le sport..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">Lettre de motivation *</label>
                    <textarea 
                      id="motivation" 
                      placeholder="Expliquez votre motivation pour rejoindre notre équipe..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                    ></textarea>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer ma candidature
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="mt-12 text-center space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Questions ? Contactez-nous
                </h3>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <div className="flex items-center justify-center">
                    <Phone className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-gray-600">+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Mail className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-gray-600">recrutement@myvisionconnect.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Contact Info */}
        <section className="animate-fadeIn">
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Besoin d'informations supplémentaires ?</h2>
            <div className="flex flex-col md:flex-row justify-around gap-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:recrutement@myvisionconnect.com" className="text-blue-600 font-medium">recrutement@myvisionconnect.com</a>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <a href="tel:+33123456789" className="text-blue-600 font-medium">+33 1 23 45 67 89</a>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p className="text-gray-800">MyVisionConnect, Paris, France</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

export default Careers;