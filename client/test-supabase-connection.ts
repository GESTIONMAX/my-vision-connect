import { supabase } from '@/integrations/supabase/client';

/**
 * Fonction pour tester la connexion à Supabase
 */
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  try {
    // Simple requête pour vérifier que la connexion fonctionne
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('Erreur de connexion à Supabase:', error);
      return {
        success: false,
        message: `Échec de la connexion: ${error.message}`
      };
    }
    
    return {
      success: true,
      message: 'Connexion à Supabase réussie!'
    };
  } catch (err) {
    console.error('Exception lors de la connexion à Supabase:', err);
    return {
      success: false,
      message: `Exception: ${err instanceof Error ? err.message : String(err)}`
    };
  }
}
