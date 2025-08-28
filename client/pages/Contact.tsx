import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  User, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';

// Types pour le formulaire de contact
type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// Options pour le sujet du message
const subjectOptions = [
  'Question sur un produit',
  'Suivi de commande',
  'Problème de livraison',
  'Retour et remboursement',
  'Service après-vente',
  'Suggestion',
  'Autre'
];

const Contact: React.FC = () => {
  // État pour les données du formulaire
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  // État pour les validations
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  
  // État pour le statut du formulaire
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  
  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Réinitialiser l'erreur pour ce champ
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Valider le formulaire
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    let isValid = true;
    
    // Validation du prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
      isValid = false;
    }
    
    // Validation du nom
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
      isValid = false;
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
      isValid = false;
    }
    
    // Validation du téléphone (optionnel mais doit être valide si fourni)
    if (formData.phone.trim() && !/^[0-9+\s()-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
      isValid = false;
    }
    
    // Validation du sujet
    if (!formData.subject) {
      newErrors.subject = 'Veuillez sélectionner un sujet';
      isValid = false;
    }
    
    // Validation du message
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus('submitting');
    
    // Simulation d'un appel API
    try {
      // En production, remplacez cette partie par un appel API réel
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
      
      // Réinitialiser le formulaire après envoi réussi
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setFormStatus('error');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 bg-blue-50">
      {/* Hero section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Contactez-nous
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Une question, un besoin spécifique ? Notre équipe est là pour vous accompagner et vous répondre dans les meilleurs délais.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 mb-16">
        {/* Formulaire de contact */}
        <div className="lg:w-2/3">
          {/* Message de succès */}
          {formStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6 text-green-700"
            >
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Message envoyé avec succès !</h3>
                  <p>Merci de nous avoir contactés. Notre équipe reviendra vers vous dans les plus brefs délais.</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Message d'erreur */}
          {formStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6 text-red-700"
            >
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Une erreur est survenue</h3>
                  <p>Nous n'avons pas pu envoyer votre message. Veuillez réessayer ou nous contacter directement par téléphone.</p>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-100">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-slate-100 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-slate-700" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Envoyez-nous un message</h2>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Prénom */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.firstName ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-slate-500'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="Votre prénom"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  
                  {/* Nom */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.lastName ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-slate-500'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.email ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-slate-500'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="votre.email@exemple.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  {/* Téléphone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                      Téléphone <span className="text-slate-500">(optionnel)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-slate-500'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="01 23 45 67 89"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                {/* Sujet */}
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                    Sujet <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.subject ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-slate-500'
                    } focus:outline-none focus:ring-2 transition-colors bg-white`}
                  >
                    <option value="">Sélectionnez un sujet</option>
                    {subjectOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>
                
                {/* Message */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.message ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-slate-500'
                    } focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="Décrivez votre demande en détail..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>
                
                {/* Bouton d'envoi */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 py-2.5 shadow-sm"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="h-5 w-5 border-2 border-r-transparent border-white rounded-full animate-spin"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Informations de contact */}
        <div className="lg:w-1/3">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl overflow-hidden shadow-md h-full">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex">
                  <div className="bg-blue-600/30 p-3 rounded-full mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-300">Email</h3>
                    <a href="mailto:contact@visionconnect.com" className="text-white hover:underline">
                      contact@visionconnect.com
                    </a>
                  </div>
                </div>
                
                {/* Téléphone */}
                <div className="flex">
                  <div className="bg-blue-600/30 p-3 rounded-full mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-300">Téléphone</h3>
                    <a href="tel:+33123456789" className="text-white hover:underline">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>
                
                {/* Adresse */}
                <div className="flex">
                  <div className="bg-blue-600/30 p-3 rounded-full mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-300">Adresse</h3>
                    <address className="text-white not-italic">
                      42 Rue de l'Innovation<br />
                      75001 Paris, France
                    </address>
                  </div>
                </div>
                
                {/* Horaires */}
                <div className="flex">
                  <div className="bg-blue-600/30 p-3 rounded-full mr-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-300">Horaires</h3>
                    <p className="text-white">
                      Lundi - Vendredi: 9h - 18h<br />
                      Samedi: 10h - 16h<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Carte */}
              <div className="mt-8 rounded-lg overflow-hidden bg-blue-600/20 h-56 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-white mb-2">Carte interactive</p>
                  <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors shadow-sm">
                    Afficher la carte
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
