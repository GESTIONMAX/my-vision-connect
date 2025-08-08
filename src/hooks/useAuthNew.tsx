import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/api/services/authService';
import type { Profile, SignUpData } from '@/types/auth';

interface AuthContextType {
  // État d'authentification
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  profile: Profile | null;
  
  // Actions d'authentification
  login: (email: string, password: string) => Promise<any>;
  signUp: (data: SignUpData) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
  updateProfile: (data: Partial<Profile>) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuthOnLoad = async () => {
      try {
        const result = await authService.checkAuth();
        setIsAuthenticated(result.authenticated);
        setUser(result.user);
        setProfile(result.profile);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        setUser(null);
        setProfile(null);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuthOnLoad();
  }, []);

  // Mutation pour la connexion
  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => 
      authService.login(data),
    onSuccess: (response) => {
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        setProfile(response.data.profile);
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
      return response;
    }
  });

  // Mutation pour l'inscription
  const signUpMutation = useMutation({
    mutationFn: (data: SignUpData) => 
      authService.signUp(data),
    onSuccess: (response) => {
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        setProfile(response.data.profile);
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
      return response;
    }
  });

  // Mutation pour la déconnexion
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      setIsAuthenticated(false);
      setUser(null);
      setProfile(null);
      queryClient.clear(); // Vider le cache pour toutes les requêtes
    }
  });

  // Mutation pour la réinitialisation du mot de passe
  const resetPasswordMutation = useMutation({
    mutationFn: (email: string) => 
      authService.resetPassword({ email })
  });

  // Mutation pour la mise à jour du profil
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<Profile>) => 
      authService.updateProfile(data),
    onSuccess: (response) => {
      if (response.success) {
        setProfile(response.data);
        queryClient.setQueryData(['profile'], response.data);
      }
      return response;
    }
  });

  // Actions exposées par le contexte
  const login = async (email: string, password: string) => {
    return loginMutation.mutateAsync({ email, password });
  };

  const signUp = async (data: SignUpData) => {
    return signUpMutation.mutateAsync(data);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const resetPassword = async (email: string) => {
    return resetPasswordMutation.mutateAsync(email);
  };

  const updateProfile = async (data: Partial<Profile>) => {
    return updateProfileMutation.mutateAsync(data);
  };

  // Valeur du contexte
  const value = {
    isAuthenticated,
    isLoading: !authChecked,
    user,
    profile,
    login,
    signUp,
    logout,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook pour utiliser l'authentification dans les composants
 */
export const useAuthNew = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthNew must be used within an AuthProvider');
  }
  
  return context;
};

/**
 * Hook pour récupérer le profil utilisateur
 */
export const useProfileNew = () => {
  const { isAuthenticated } = useAuthNew();
  
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getProfile(),
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch profile');
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
