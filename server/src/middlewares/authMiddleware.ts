import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

// Étendre l'interface Request pour inclure l'utilisateur
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email?: string;
      };
    }
  }
}

/**
 * Middleware pour vérifier le token JWT
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Accès non autorisé. Token manquant ou invalide'
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Vérifier et décoder le token
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
      
      // Vérifier si l'utilisateur existe toujours
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      // Ajouter les informations d'utilisateur à la requête
      req.user = {
        userId: decoded.userId,
        email: decoded.email
      };

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token invalide ou expiré'
      });
    }
  } catch (error) {
    console.error('Erreur dans le middleware d\'authentification:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'authentification'
    });
  }
};

/**
 * Middleware optionnel - extrait les informations d'utilisateur si présentes,
 * mais ne renvoie pas d'erreur si aucune authentification n'est fournie
 */
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Continuer sans authentification
      return next();
    }

    const token = authHeader.split(' ')[1];

    try {
      // Vérifier et décoder le token
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
      
      // Vérifier si l'utilisateur existe toujours
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (user) {
        // Ajouter les informations d'utilisateur à la requête
        req.user = {
          userId: decoded.userId,
          email: decoded.email
        };
      }
    } catch (error) {
      // Ignorer les erreurs de token - continuer sans authentification
    }

    next();
  } catch (error) {
    console.error('Erreur dans le middleware d\'authentification optionnelle:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'authentification'
    });
  }
};

/**
 * Middleware pour vérifier les rôles utilisateur
 * @param allowedRoles Rôles autorisés pour accéder à la ressource
 */
export const checkRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user as { userId: string };

      // Récupérer le profil de l'utilisateur avec son rôle
      const profile = await prisma.profile.findUnique({
        where: { userId }
      });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'Profil utilisateur non trouvé'
        });
      }

      // Vérifier si le rôle est autorisé
      if (allowedRoles.includes(profile.user_type)) {
        return next();
      }

      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Rôle requis: ' + allowedRoles.join(', ')
      });
    } catch (error) {
      console.error('Erreur lors de la vérification des rôles:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la vérification des droits'
      });
    }
  };
};
