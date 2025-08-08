
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WordPressUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: string[];
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

  // Check if user is logged in on load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('wp_auth_token');
        const userData = localStorage.getItem('wp_user_data');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          
          // Convert to Profile format
          const profileData: Profile = {
            id: parsedUser.id.toString(),
            email: parsedUser.email,
            first_name: parsedUser.first_name,
            last_name: parsedUser.last_name,
            phone: null,
            avatar_url: null,
            user_type: 'customer', // Default, can be enhanced later
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
        console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
        localStorage.removeItem('wp_auth_token');
        localStorage.removeItem('wp_user_data');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
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
        // Store authentication data
        localStorage.setItem('wp_auth_token', data.token);
        localStorage.setItem('wp_user_data', JSON.stringify(data.user_data));
        
        setUser(data.user_data);
        
        // Convert to Profile format
        const profileData: Profile = {
          id: data.user_data.id.toString(),
          email: data.user_data.email,
          first_name: data.user_data.first_name,
          last_name: data.user_data.last_name,
          phone: null,
          avatar_url: null,
          user_type: 'customer',
          company_name: null,
          company_siret: null,
          company_sector: null,
          pricing_group: 'standard',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        setProfile(profileData);
        
        return { error: null };
      } else {
        return { error: data.error || 'Erreur de connexion' };
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
        // Auto-login after successful registration
        return await signIn(userData.email, userData.password);
      } else {
        return { error: data.error || 'Erreur lors de l\'inscription' };
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return { error: 'Erreur lors de l\'inscription' };
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('wp_auth_token');
      localStorage.removeItem('wp_user_data');
      
      setUser(null);
      setProfile(null);
      
      window.location.href = '/';
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
