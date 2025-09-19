import React, { useState } from 'react';
import { Building, AlertCircle, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type FormStatus = 'idle' | 'submitting' | 'error';

const B2BLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email invalide';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setFormStatus('submitting');
    setErrorMessage('');
    
    try {
      // Simulation d'un appel API
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Exemple de réponse d'erreur pour démontrer l'interface
          if (formData.email === 'test@example.com' && formData.password === 'password123') {
            resolve(true);
          } else {
            reject(new Error('Identifiants incorrects'));
          }
        }, 1000);
      });
      
      // Redirection vers le tableau de bord B2B en cas de succès
      navigate('/b2b/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue lors de la connexion');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 bg-blue-50 min-h-screen flex flex-col justify-center">
      <div className="max-w-md mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Lock className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Connexion B2B</h1>
          <p className="text-slate-600">
            Accédez à votre espace professionnel
          </p>
        </div>
        
        {/* Message d'erreur */}
        {formStatus === 'error' && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 flex items-center">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <div>{errorMessage || 'Une erreur est survenue. Veuillez réessayer.'}</div>
          </div>
        )}
        
        {/* Formulaire */}
        <div className="bg-white p-8 rounded-xl shadow border border-slate-200">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email professionnel
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="entreprise@exemple.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Se souvenir de moi
                  </label>
                </div>
                
                <Link to="/b2b/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 shadow-sm"
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? (
                  <>
                    <div className="h-4 w-4 border-2 border-r-transparent border-white rounded-full animate-spin mr-2"></div>
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-slate-600">
            Vous n'avez pas encore de compte B2B ? <Link to="/b2b/register" className="text-indigo-600 hover:text-indigo-800 hover:underline">Demandez un accès</Link>
          </p>
        </div>
        
        <div className="text-center mt-4">
          <Link to="/b2b" className="text-sm text-slate-500 hover:text-slate-700">
            Retour à l'espace B2B
          </Link>
        </div>
      </div>
    </div>
  );
};

export default B2BLogin;