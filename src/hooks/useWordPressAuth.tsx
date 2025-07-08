import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { wordpressApi } from '@/services/wordpressApi';
import { woocommerceApi } from '@/services/woocommerceApi';

interface WordPressUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: string[];
  capabilities: Record<string, boolean>;
  avatar_urls: Record<string, string>;
}

interface Profile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  user_type: 'customer' | 'business' | 'admin' | 'partner';
  company_name: string | null;
  company_siret: string | null;
  company_sector: string | null;
  pricing_group: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: WordPressUser | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    userType: 'customer' | 'business';
    companyName?: string;
    companySector?: string;
  }) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<WordPressUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('wp_auth_token');
        if (token) {
          // Vérifier si le token est valide en récupérant les infos utilisateur
          await fetchUserProfile();
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
        // Token invalide, le supprimer
        localStorage.removeItem('wp_auth_token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Récupérer le profil utilisateur depuis WordPress
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        
        // Convertir vers le format Profile
        const profileData: Profile = {
          id: currentUser.id.toString(),
          email: currentUser.email,
          first_name: currentUser.first_name,
          last_name: currentUser.last_name,
          phone: null, // À récupérer depuis les meta_data si disponible
          avatar_url: currentUser.avatar_urls?.['96'] || null,
          user_type: currentUser.roles.includes('administrator') ? 'admin' : 'customer',
          company_name: null,
          company_siret: null,
          company_sector: null,
          pricing_group: 'standard',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw error;
    }
  };

  const getCurrentUser = async (): Promise<WordPressUser | null> => {
    try {
      // Utiliser l'API WordPress pour récupérer l'utilisateur actuel
      // Ceci nécessitera une fonction edge pour l'authentification
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('wordpress-auth', {
        body: { action: 'get_current_user' }
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur actuel:', error);
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Appel à l'API WordPress pour l'authentification
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('wordpress-auth', {
        body: { 
          action: 'login',
          email,
          password
        }
      });

      if (error) {
        return { error: error.message };
      }

      if (data.success) {
        // Stocker le token d'authentification
        localStorage.setItem('wp_auth_token', data.token);
        
        // Récupérer le profil utilisateur
        await fetchUserProfile();
        
        return { error: null };
      } else {
        return { error: data.message || 'Erreur de connexion' };
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return { error: 'Erreur de connexion' };
    }
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    userType: 'customer' | 'business';
    companyName?: string;
    companySector?: string;
  }) => {
    try {
      // Créer un utilisateur WordPress et un client WooCommerce
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('wordpress-auth', {
        body: { 
          action: 'register',
          ...userData
        }
      });

      if (error) {
        return { error: error.message };
      }

      if (data.success) {
        // Connecter automatiquement l'utilisateur après l'inscription
        return await signIn(userData.email, userData.password);
      } else {
        return { error: data.message || 'Erreur lors de l\'inscription' };
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return { error: 'Erreur lors de l\'inscription' };
    }
  };

  const signOut = async () => {
    try {
      // Supprimer le token local
      localStorage.removeItem('wp_auth_token');
      
      // Réinitialiser l'état
      setUser(null);
      setProfile(null);
      
      // Rediriger vers la page de connexion
      window.location.href = '/auth';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'Non authentifié' };

    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('wordpress-auth', {
        body: { 
          action: 'update_profile',
          user_id: user.id,
          updates
        }
      });

      if (error) {
        return { error: error.message };
      }

      if (data.success && profile) {
        setProfile({ ...profile, ...updates });
      }

      return { error: null };
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      return { error: 'Erreur lors de la mise à jour du profil' };
    }
  };

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};