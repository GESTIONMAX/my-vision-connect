import { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';

/**
 * Composant de test pour vérifier la connexion à Supabase
 */
export function SupabaseConnectionTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Vérification de la connexion à Supabase...');
  const [details, setDetails] = useState('');

  useEffect(() => {
    async function checkConnection() {
      try {
        // Afficher les variables d'environnement (sans les valeurs sensibles)
        console.log('URL Supabase:', import.meta.env.VITE_SUPABASE_URL);
        console.log('Clé Supabase définie:', !!import.meta.env.VITE_SUPABASE_KEY);

        // Faire une simple requête pour tester la connexion
        const { data, error } = await supabase.from('profiles').select('count');

        if (error) {
          console.error('Erreur de connexion à Supabase:', error);
          setStatus('error');
          setMessage('Échec de la connexion à Supabase');
          setDetails(error.message);
          return;
        }

        console.log('Réponse de Supabase:', data);
        setStatus('success');
        setMessage('Connexion à Supabase réussie!');
        setDetails(`Requête traitée avec succès. Données reçues: ${JSON.stringify(data)}`);
      } catch (err) {
        console.error('Exception lors du test de connexion:', err);
        setStatus('error');
        setMessage('Erreur lors du test de connexion');
        setDetails(err instanceof Error ? err.message : String(err));
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto my-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Test de connexion Supabase</h2>
      
      <div className={`p-3 rounded-md mb-4 ${
        status === 'loading' ? 'bg-blue-100 text-blue-800' :
        status === 'success' ? 'bg-green-100 text-green-800' :
        'bg-red-100 text-red-800'
      }`}>
        <div className="font-medium">{message}</div>
        {details && (
          <div className="mt-2 text-sm">
            {details}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        <p>Configuration Supabase:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>URL: {import.meta.env.VITE_SUPABASE_URL || 'Non définie'}</li>
          <li>Clé API: {import.meta.env.VITE_SUPABASE_KEY ? '[Définie]' : '[Non définie]'}</li>
        </ul>
      </div>
    </div>
  );
}
