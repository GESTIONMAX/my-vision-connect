const API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://votre-site-wordpress.com/wp-json';

interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
  };
  message?: string;
}

export const wordpressAuth = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Échec de la connexion');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: 'customer' | 'business';
  }): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${API_URL}/wp/v2/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.email,
          email: userData.email,
          password: userData.password,
          first_name: userData.firstName,
          last_name: userData.lastName,
          meta: {
            user_type: userData.userType,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Échec de l'inscription");
      }

      return { success: true };
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  },

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/jwt-auth/v1/token/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Erreur lors de la validation du token:', error);
      return false;
    }
  },

  async getUserProfile(token: string) {
    try {
      const response = await fetch(`${API_URL}/wp/v2/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du profil');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },
};
