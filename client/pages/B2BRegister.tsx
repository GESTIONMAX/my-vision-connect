import React, { useState } from 'react';
import { Building, CheckCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const B2BRegister: React.FC = () => {
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [step, setStep] = useState(1);
  
  // Données du formulaire
  const [formData, setFormData] = useState({
    // Étape 1: Informations entreprise
    companyName: '',
    siret: '',
    vat: '',
    industry: '',
    
    // Étape 2: Informations de contact
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    
    // Étape 3: Adresse et facturation
    address: '',
    city: '',
    zipCode: '',
    country: '',
    billingEmail: '',
    
    // Étape 4: Sécurité
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    dataProcessingAccepted: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    if (currentStep === 1) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Nom de l\'entreprise requis';
        isValid = false;
      }
      
      if (!formData.siret.trim()) {
        newErrors.siret = 'Numéro SIRET requis';
        isValid = false;
      } else if (!/^\d{14}$/.test(formData.siret)) {
        newErrors.siret = 'Le SIRET doit comporter 14 chiffres';
        isValid = false;
      }
      
      if (formData.vat && !/^[A-Z]{2}\d+$/.test(formData.vat)) {
        newErrors.vat = 'Format TVA invalide';
        isValid = false;
      }
    }
    
    else if (currentStep === 2) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'Prénom requis';
        isValid = false;
      }
      
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Nom requis';
        isValid = false;
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email requis';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Format email invalide';
        isValid = false;
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Téléphone requis';
        isValid = false;
      }
      
      if (!formData.position.trim()) {
        newErrors.position = 'Fonction requise';
        isValid = false;
      }
    }
    
    else if (currentStep === 3) {
      if (!formData.address.trim()) {
        newErrors.address = 'Adresse requise';
        isValid = false;
      }
      
      if (!formData.city.trim()) {
        newErrors.city = 'Ville requise';
        isValid = false;
      }
      
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = 'Code postal requis';
        isValid = false;
      }
      
      if (!formData.country.trim()) {
        newErrors.country = 'Pays requis';
        isValid = false;
      }
    }
    
    else if (currentStep === 4) {
      if (!formData.password) {
        newErrors.password = 'Mot de passe requis';
        isValid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = '8 caractères minimum';
        isValid = false;
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmation requise';
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        isValid = false;
      }
      
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'Vous devez accepter les conditions';
        isValid = false;
      }
      
      if (!formData.dataProcessingAccepted) {
        newErrors.dataProcessingAccepted = 'Vous devez accepter le traitement des données';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) {
      return;
    }
    
    setFormStatus('submitting');
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
      
      // Redirection après quelques secondes
      setTimeout(() => {
        navigate('/b2b/registration-confirmation');
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setFormStatus('error');
    }
  };
  
  // Rendu conditionnel selon l'étape
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Informations entreprise</h2>
            
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'entreprise <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.companyName ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>
            
            <div>
              <label htmlFor="siret" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro SIRET <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="siret"
                name="siret"
                value={formData.siret}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.siret ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.siret && <p className="text-red-500 text-sm mt-1">{errors.siret}</p>}
            </div>
            
            <div>
              <label htmlFor="vat" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de TVA intracommunautaire
              </label>
              <input
                type="text"
                id="vat"
                name="vat"
                value={formData.vat}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.vat ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.vat && <p className="text-red-500 text-sm mt-1">{errors.vat}</p>}
            </div>
            
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Secteur d'activité <span className="text-red-500">*</span>
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.industry ? 'border-red-300' : 'border-gray-300'}`}
              >
                <option value="">Sélectionnez un secteur</option>
                <option value="retail">Commerce de détail</option>
                <option value="wholesale">Commerce de gros</option>
                <option value="manufacturing">Industrie manufacturière</option>
                <option value="construction">Construction</option>
                <option value="healthcare">Santé</option>
                <option value="education">Éducation</option>
                <option value="other">Autre</option>
              </select>
              {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.firstName ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.lastName ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email professionnel <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Fonction dans l'entreprise <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.position ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Adresse et facturation</h2>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.address ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Ville <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.city ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Code postal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.zipCode ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Pays <span className="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.country ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="">Sélectionnez un pays</option>
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                  <option value="CH">Suisse</option>
                  <option value="LU">Luxembourg</option>
                  <option value="CA">Canada</option>
                  <option value="Other">Autre</option>
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="billingEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email de facturation
              </label>
              <input
                type="email"
                id="billingEmail"
                name="billingEmail"
                value={formData.billingEmail}
                onChange={handleChange}
                placeholder="Si différent de l'email principal"
                className={`w-full px-3 py-2 border rounded-md ${errors.billingEmail ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.billingEmail && <p className="text-red-500 text-sm mt-1">{errors.billingEmail}</p>}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Sécurité et validation</h2>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1"
                />
                <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
                  J'accepte les <Link to="/terms" className="text-blue-600 hover:underline">conditions générales</Link> et la <Link to="/privacy" className="text-blue-600 hover:underline">politique de confidentialité</Link> <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="dataProcessingAccepted"
                  name="dataProcessingAccepted"
                  checked={formData.dataProcessingAccepted}
                  onChange={handleChange}
                  className="mt-1"
                />
                <label htmlFor="dataProcessingAccepted" className="ml-2 block text-sm text-gray-700">
                  J'accepte que mes données soient utilisées pour traiter ma demande et créer mon compte B2B <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.dataProcessingAccepted && <p className="text-red-500 text-sm">{errors.dataProcessingAccepted}</p>}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Affichage du message de succès
  if (formStatus === 'success') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Demande envoyée avec succès !</h2>
          <p className="text-green-700 mb-6">
            Merci pour votre inscription. Nous allons vérifier vos informations et vous contacter sous 24 à 48 heures ouvrées pour finaliser la création de votre compte B2B.
          </p>
          <Button
            onClick={() => navigate('/b2b')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Retour à l'espace B2B
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-blue-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Building className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Créer un compte B2B</h1>
          <p className="text-slate-600">
            Rejoignez notre réseau de professionnels et bénéficiez d'avantages exclusifs
          </p>
        </div>
        
        {/* Message d'erreur */}
        {formStatus === 'error' && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 flex items-start">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Une erreur est survenue</h3>
              <p>Nous n'avons pas pu traiter votre demande. Veuillez vérifier vos informations et réessayer.</p>
            </div>
          </div>
        )}
        
        {/* Indicateur d'étape */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative mb-1">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                  ${stepNumber <= step ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-600'}`}
              >
                {stepNumber}
              </div>
            ))}
            
            {/* Ligne de progression */}
            <div className="absolute left-0 right-0 h-0.5 bg-slate-200">
              <div 
                className="h-full bg-slate-800 transition-all duration-300"
                style={{ width: `${(step - 1) * 33.33}%` }} 
              />
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-slate-600 px-1">
            <span>Entreprise</span>
            <span>Contact</span>
            <span>Adresse</span>
            <span>Validation</span>
          </div>
        </div>
        
        {/* Formulaire */}
        <div className="bg-white p-8 rounded-xl shadow border border-slate-200">
          <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()}>
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="px-6"
                >
                  Précédent
                </Button>
              )}
              
              <div className="ml-auto">
                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-sm"
                  >
                    Suivant
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-sm"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="h-4 w-4 border-2 border-r-transparent border-white rounded-full animate-spin mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer la demande'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
        
        <div className="text-center mt-6 text-sm text-slate-600">
          Vous avez déjà un compte B2B ? <Link to="/b2b/login" className="text-blue-600 hover:underline">Connectez-vous ici</Link>
        </div>
      </div>
    </div>
  );
};

export default B2BRegister;
