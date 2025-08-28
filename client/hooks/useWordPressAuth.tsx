import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { wordpressAuth } from '@/services/wordpressAuth';
import { WORDPRESS_CONFIG } from '@/config/wordpress';

export interface WordPressUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: string[];
  meta?: Record<string, any>;
}

export interface Profile {
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
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signUp: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: 'customer' | 'business';
  }) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<{ success: boolean; message?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<WordPressUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger l'utilisateur au démarrage
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const isAuthenticated = await wordpressAuth.isAuthenticated();
        
        if (isAuthenticated) {
          const token = wordpressAuth.getToken();
          if (token) {
            const userData = await wordpressAuth.getUserProfile(token);
            if (userData) {
              setUser(userData);
              // Mapper les données utilisateur WordPress vers le format Profile
              setProfile({
                id: userData.id.toString(),
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
                phone: userData.meta?.phone || null,
                avatar_url: userData.meta?.avatar_url || null,
                user_type: userData.meta?.user_type || 'customer',
                company_name: userData.meta?.company_name || null,
                company_siret: userData.meta?.company_siret || null,
                company_sector: userData.meta?.company_sector || null,
                pricing_group: userData.meta?.pricing_group || null,
                created_at: userData.meta?.created_at || new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });
            }
          }
        }
      } catch (err) {
        console.error('Erreur lors du chargement de l\'utilisateur:', err);
        setError('Impossible de charger les informations utilisateur');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Connexion
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await wordpressAuth.login(email, password);
      
      if (result.success && result.data?.token) {
        const userData = await wordpressAuth.getUserProfile(result.data.token);
        if (userData) {
          setUser(userData);
          setProfile({
            id: userData.id.toString(),
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone: userData.meta?.phone || null,
            avatar_url: userData.meta?.avatar_url || null,
            user_type: userData.meta?.user_type || 'customer',
            company_name: userData.meta?.company_name || null,
            company_siret: userData.meta?.company_siret || null,
            company_sector: userData.meta?.company_sector || null,
            pricing_group: userData.meta?.pricing_group || null,
            created_at: userData.meta?.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      }
      
      return { success: result.success, message: result.message };
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      const message = err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Inscription
  const signUp = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: 'customer' | 'business';
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await wordpressAuth.register({
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userType: userData.userType,
      });
      
      if (result.success) {
        // Connecter automatiquement l'utilisateur après l'inscription
        await signIn(userData.email, userData.password);
      }
      
      return result;
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err);
      const message = err instanceof Error ? err.message : "Une erreur est survenue lors de l'inscription";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const signOut = async () => {
    try {
      setLoading(true);
      wordpressAuth.logout();
      setUser(null);
      setProfile(null);
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
      setError('Une erreur est survenue lors de la déconnexion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mise à jour du profil
  const updateProfile = async (profileData: Partial<Profile>) => {
    try {
      setLoading(true);
      setError(null);
      
      const token = wordpressAuth.getToken();
      if (!token) {
        throw new Error('Non authentifié');
      }
      
      // Ici, vous devriez implémenter la logique pour mettre à jour le profil
      // via une API WordPress personnalisée ou un plugin comme ACF
      
      // Exemple de mise à jour du profil
      const response = await fetch(`${WORDPRESS_CONFIG.BASE_URL}/wp-json/wp/v2/users/me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          meta: {
            ...profileData,
          },
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Échec de la mise à jour du profil');
      }
      
      const updatedUser = await response.json();
      
      // Mettre à jour l'état local
      if (updatedUser) {
        setUser(updatedUser);
        setProfile({
          ...profile!,
          ...profileData,
        });
      }
      
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      const message = err instanceof Error ? err.message : 'Une erreur est survenue lors de la mise à jour du profil';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Rafraîchir les données utilisateur
  const refreshUser = useCallback(async () => {
    try {
      const token = wordpressAuth.getToken();
      if (token) {
        const userData = await wordpressAuth.getUserProfile(token);
        if (userData) {
          setUser(userData);
          setProfile({
            id: userData.id.toString(),
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone: userData.meta?.phone || null,
            avatar_url: userData.meta?.avatar_url || null,
            user_type: userData.meta?.user_type || 'customer',
            company_name: userData.meta?.company_name || null,
            company_siret: userData.meta?.company_siret || null,
            company_sector: userData.meta?.company_sector || null,
            pricing_group: userData.meta?.pricing_group || null,
            created_at: userData.meta?.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      }
    } catch (err) {
      console.error('Erreur lors du rafraîchissement des données utilisateur:', err);
      setError('Impossible de rafraîchir les données utilisateur');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
