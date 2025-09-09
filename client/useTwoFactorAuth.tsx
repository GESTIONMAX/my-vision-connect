import { useState, useEffect } from 'react';

// Interface pour la réponse de signInWithOtp incluant verificationId
interface OtpResponseData {
  user: null;
  session: null;
  messageId?: string;
  verificationId?: string;
}

// Interface pour les données de profil utilisateur
interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  user_type: 'admin' | 'customer';
  pricing_group?: string;
  created_at: string;
  updated_at: string;
}

// États possibles lors de l'authentification à deux facteurs
type AuthStepState = 'idle' | 'phone_required' | 'otp_required' | 'authenticated' | 'error';

/**
 * Hook personnalisé pour l'authentification avec 2FA par SMS
 */
export function useTwoFactorAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authStep, setAuthStep] = useState<AuthStepState>('idle');
  const [verificationId, setVerificationId] = useState<string | null>(null);

  // Effet pour vérifier la session au chargement
  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      setError(null);
      
      try {
        
        if (error) {
          throw error;
        }
        
        if (data?.session) {
          setUser(data.session.user);
          setAuthStep('authenticated');
          await fetchProfile(data.session.user.id);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération de la session:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    
    getSession();
    
    // Configurer un écouteur pour les changements d'authentification
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          setAuthStep('authenticated');
          await fetchProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setAuthStep('idle');
        }
      }
    );
    
    // Nettoyer l'écouteur
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  // Fonction pour récupérer le profil utilisateur
  const fetchProfile = async (userId: string) => {
    try {
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        throw error;
      }
      
      setProfile(data as Profile);
    } catch (err) {
      console.error('Erreur lors de la récupération du profil:', err);
      setError((err as Error).message);
    }
  };

  /**
   * Étape 1 : Inscription avec email/password et téléphone
   */
  const signUp = async (email: string, password: string, phone: string, userData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      // Vérifier que le numéro de téléphone est au format international (ex: +33612345678)
      if (!phone.startsWith('+')) {
        throw new Error("Le numéro de téléphone doit être au format international (+33...)");
      }
      
      // Inscription avec email/password
        email,
        password,
        phone,
        options: {
          data: {
            ...userData,
            phone: phone // Stocker aussi le téléphone dans les métadonnées
          }
        }
      });
      
      if (signUpError) {
        throw signUpError;
      }
      
      // Si l'utilisateur est créé
      if (signUpData.user) {
        // Créer le profil dans la table profiles avec le téléphone
        const profileData = {
          id: signUpData.user.id,
          email,
          phone,
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          user_type: userData.user_type || 'customer',
          pricing_group: userData.pricing_group || 'standard',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
          .from('profiles')
          .insert(profileData);
        
        if (profileError) {
          console.error('Erreur lors de la création du profil:', profileError);
        }
        
        // Si confirmation par email est activée
        if (!signUpData.session) {
          return {
            success: true,
            message: "Inscription réussie! Veuillez vérifier votre email pour confirmer votre compte.",
            requiresEmailConfirmation: true
          };
        }
        
        // Utilisateur créé et connecté
        setUser(signUpData.user);
        await fetchProfile(signUpData.user.id);
        setAuthStep('authenticated');
        
        return {
          success: true,
          user: signUpData.user
        };
      }
      
      return {
        success: false,
        error: new Error("Erreur lors de l'inscription.")
      };
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      setError((err as Error).message);
      return { 
        success: false,
        error: err 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Étape 1 de connexion : demander un code OTP par SMS
   */
  const signInWithPhone = async (phone: string) => {
    setLoading(true);
    setError(null);
    setAuthStep('phone_required');
    
    try {
      // Vérifier que le numéro de téléphone est au format international
      if (!phone.startsWith('+')) {
        throw new Error("Le numéro de téléphone doit être au format international (+33...)");
      }
      
      // Envoyer un OTP au numéro de téléphone
        phone
      }) as { data: OtpResponseData, error: null } | { data: null, error: Error };
      
      if (error) {
        throw error;
      }
      
      // Stocker l'ID de vérification si disponible
      if (data?.verificationId) {
        setVerificationId(data.verificationId);
      }
      
      setAuthStep('otp_required');
      
      return {
        success: true,
        message: "Code de vérification envoyé par SMS."
      };
    } catch (err) {
      console.error('Erreur lors de l\'envoi du SMS:', err);
      setError((err as Error).message);
      setAuthStep('error');
      return {
        success: false,
        error: err
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Étape 2 de connexion : vérifier le code OTP
   */
  const verifyOtp = async (phone: string, token: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Vérifier le code OTP
        phone,
        token,
        type: 'sms'
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        setUser(data.user);
        setAuthStep('authenticated');
        await fetchProfile(data.user.id);
        
        return {
          success: true,
          user: data.user
        };
      }
      
      throw new Error("Authentification incomplète.");
    } catch (err) {
      console.error('Erreur lors de la vérification du code:', err);
      setError((err as Error).message);
      return {
        success: false,
        error: err
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Connexion classique avec email et mot de passe
   * Utilisation recommandée après une première connexion avec 2FA
   */
  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
        email,
        password
      });
      
      if (error) {
        // Si l'erreur est "Email not confirmed"
        if (error.message.includes('Email not confirmed')) {
          throw new Error("Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception.");
        }
        throw error;
      }
      
      setUser(data.user);
      setAuthStep('authenticated');
      await fetchProfile(data.user!.id);
      
      return {
        success: true,
        user: data.user
      };
    } catch (err) {
      console.error('Erreur lors de la connexion par email:', err);
      setError((err as Error).message);
      return {
        success: false,
        error: err
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Déconnexion
   */
  const signOut = async () => {
    try {
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setProfile(null);
      setAuthStep('idle');
      
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
      setError((err as Error).message);
      return {
        success: false,
        error: err
      };
    }
  };

  /**
   * Mettre à jour un profil utilisateur
   */
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      setError("Vous devez être connecté pour mettre à jour votre profil");
      return { success: false, error: new Error("Non connecté") };
    }
    
    try {
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Récupérer le profil mis à jour
      await fetchProfile(user.id);
      
      // Si le numéro de téléphone a été mis à jour, mettre à jour les métadonnées utilisateur
      if (updates.phone) {
          phone: updates.phone
        });
      }
      
      return {
        success: true,
        profile
      };
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      setError((err as Error).message);
      return {
        success: false,
        error: err
      };
    }
  };

  // Retourner l'état et les fonctions
  return {
    user,
    profile,
    loading,
    error,
    authStep,
    signUp,
    signInWithPhone,
    verifyOtp,
    signInWithEmail, // Pour la connexion classique email/password
    signOut,
    updateProfile
  };
}

// Export par défaut pour faciliter l'import
export default useTwoFactorAuth;
