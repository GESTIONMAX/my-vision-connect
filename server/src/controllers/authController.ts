// @ts-ignore - Pour éviter les avertissements d'import non utilisé
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Interfaces pour les types User et Profile
interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  user_type: string;
  company_name: string | null;
  company_sector: string | null;
  company_siret: string | null;
  pricing_group: string | null;
  avatar_url: string | null;
  userId: string;
  created_at: Date;
  updated_at: Date;
}

interface User {
  id: string;
  email: string;
  password: string;
  role?: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile | null;
}

// Interface pour étendre Request avec l'utilisateur authentifié
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; email?: string };
    }
  }
}

// Note: Les types pour les propriétés du PrismaClient sont maintenant définis dans server/src/types/prisma.d.ts

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';
const JWT_EXPIRATION = '24h';
const REFRESH_TOKEN_EXPIRATION = '7d';
const SALT_ROUNDS = 10;

/**
 * Gestionnaire d'inscription utilisateur
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName,
      phone,
      userType,
      companyName,
      companySector
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {
            first_name: firstName || '',
            last_name: lastName || '',
            phone: phone || '',
            user_type: userType || 'client',
            company_name: companyName || '',
            company_sector: companySector || ''
          }
        }
      },
      include: {
        profile: true
      }
    }) as User;

    // Générer les tokens
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, tokenType: 'refresh' },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );

    // Stocker le refresh token dans la base de données
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
      }
    });

    // Retourner la réponse
    return res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      data: {
        user: {
          id: user.id,
          email: user.email
        },
        profile: user.profile,
        token,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription',
      errors: error
    });
  }
};

/**
 * Gestionnaire de connexion utilisateur
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true
      }
    }) as unknown as User & { profile: UserProfile };

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }

    // Générer les tokens
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, tokenType: 'refresh' },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );

    // Stocker le refresh token dans la base de données
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
      }
    });

    // Retourner la réponse
    return res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user: {
          id: user.id,
          email: user.email
        },
        profile: user.profile,
        token,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      errors: error
    });
  }
};

/**
 * Gestionnaire de déconnexion utilisateur
 */
export const logout = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };

    // Supprimer tous les refresh tokens de l'utilisateur
    await prisma.refreshToken.deleteMany({
      where: { userId }
    });

    return res.status(200).json({
      success: true,
      message: 'Déconnexion réussie'
    });
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la déconnexion',
      errors: error
    });
  }
};

/**
 * Gestionnaire de récupération du profil utilisateur
 */
export const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };

    // Récupérer le profil de l'utilisateur
    const profile = await prisma.profile.findUnique({
      where: { userId }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profil non trouvé'
      });
    }

    return res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil',
      errors: error
    });
  }
};

/**
 * Gestionnaire de mise à jour du profil utilisateur
 */
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const profileData = req.body;

    // Champs autorisés à mettre à jour
    const allowedFields = [
      'first_name',
      'last_name',
      'phone',
      'company_name',
      'company_siret',
      'company_sector',
      'avatar_url'
    ];

    // Filtrer les champs non autorisés
    const filteredData: Record<string, any> = {};
    allowedFields.forEach(field => {
      if (field in profileData) {
        filteredData[field] = profileData[field];
      }
    });

    // Mettre à jour le profil
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: filteredData
    });

    return res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: updatedProfile
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil',
      errors: error
    });
  }
};

/**
 * Gestionnaire de rafraîchissement du token JWT
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token non fourni'
      });
    }

    // Vérifier si le token existe en base de données
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken }
    });

    if (!tokenRecord) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token invalide'
      });
    }

    // Vérifier si le token a expiré
    if (new Date() > tokenRecord.expiresAt) {
      // Supprimer le token expiré
      await prisma.refreshToken.delete({
        where: { id: tokenRecord.id }
      });
      
      return res.status(401).json({
        success: false,
        message: 'Refresh token expiré'
      });
    }

    try {
      // Vérifier et décoder le refresh token
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as { userId: string };
      
      // Récupérer l'utilisateur
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      // Générer un nouveau token JWT
      const newToken = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );

      // Générer un nouveau refresh token
      const newRefreshToken = jwt.sign(
        { userId: user.id, tokenType: 'refresh' },
        JWT_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRATION }
      );

      // Supprimer l'ancien refresh token
      await prisma.refreshToken.delete({
        where: { id: tokenRecord.id }
      });

      // Stocker le nouveau refresh token
      await prisma.refreshToken.create({
        data: {
          token: newRefreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
        }
      });

      return res.status(200).json({
        success: true,
        data: {
          token: newToken,
          refreshToken: newRefreshToken
        }
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token invalide'
      });
    }
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors du rafraîchissement du token',
      errors: error
    });
  }
};

/**
 * Gestionnaire de demande de réinitialisation du mot de passe
 */
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Pour des raisons de sécurité, nous ne révélons pas si l'utilisateur existe ou non
      return res.status(200).json({
        success: true,
        message: 'Si l\'adresse email existe, un email de réinitialisation a été envoyé'
      });
    }

    // Générer un token de réinitialisation
    const resetToken = jwt.sign(
      { userId: user.id, purpose: 'password_reset' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Stocker le token dans la base de données
    await prisma.passwordReset.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 heure
      }
    });

    // TODO: Envoyer un email de réinitialisation
    // Pour l'instant, retournons simplement le token pour les tests
    return res.status(200).json({
      success: true,
      message: 'Si l\'adresse email existe, un email de réinitialisation a été envoyé',
      // En production, ne pas retourner ce token
      // Il est inclus ici uniquement pour les tests
      data: {
        resetToken
      }
    });
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation du mot de passe:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la demande de réinitialisation du mot de passe',
      errors: error
    });
  }
};

/**
 * Vérification de l'état d'authentification
 */
export const checkAuth = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true
      }
    }) as unknown as User & { profile: UserProfile };

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email
        },
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification de l\'authentification',
      errors: error
    });
  }
};
