import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Profile, SignUpData } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signUp: (data: SignUpData) => Promise<{ error: any }>;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile
          setTimeout(async () => {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            setProfile(profileData);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Fetch user profile
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profileData }) => {
            setProfile(profileData);
          });
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        toast({
          title: "Erreur de connexion Google",
          description: error.message,
          variant: "destructive",
        });
      }

      return { error };
    } catch (error) {
      const authError = error as Error;
      toast({
        title: "Erreur de connexion Google",
        description: authError.message,
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
      }

      return { error };
    } catch (error) {
      const authError = error as Error;
      toast({
        title: "Erreur de connexion",
        description: authError.message,
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            user_type: data.userType || 'customer',
            company_name: data.companyName,
            company_sector: data.companySector,
          }
        }
      });

      if (error) {
        toast({
          title: "Erreur d'inscription",
          description: error.message,
          variant: "destructive",
        });
      } else if (authData.user) {
        // Create profile record
        const profileData = {
          id: authData.user.id,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          user_type: data.userType || 'customer',
          company_name: data.companyName,
          company_sector: data.companySector,
          pricing_group: 'standard',
        };

        await supabase
          .from('profiles')
          .insert(profileData);

        toast({
          title: "Inscription réussie",
          description: "Vérifiez votre email pour confirmer votre compte",
        });
      }

      return { error };
    } catch (error) {
      const authError = error as Error;
      toast({
        title: "Erreur d'inscription",
        description: authError.message,
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      
      // Clear local state
      setUser(null);
      setProfile(null);
      
      // Clear any cached data
      localStorage.removeItem('auth-token');
      sessionStorage.clear();
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) {
        return { error: new Error('User not authenticated') };
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Erreur de mise à jour",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Update local profile state
        setProfile(current => current ? { ...current, ...updates } : null);
        toast({
          title: "Profil mis à jour",
          description: "Vos informations ont été mises à jour",
        });
      }

      return { error };
    } catch (error) {
      const updateError = error as Error;
      toast({
        title: "Erreur de mise à jour",
        description: updateError.message,
        variant: "destructive",
      });
      return { error: updateError };
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};