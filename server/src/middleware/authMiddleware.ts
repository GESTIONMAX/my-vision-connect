import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../app';

// Constante pour le secret JWT
const JWT_SECRET = process.env.JWT_SECRET || 'secret_temporaire_a_changer';

/**
 * Interface pour étendre l'objet Request avec les propriétés utilisateur
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Middleware pour protéger les routes - vérifie le token JWT
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Vérifier si le token est dans les headers d'autorisation
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extraire le token du header
      token = req.headers.authorization.split(' ')[1];

      // Vérifier le token
      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
        email: string;
        role: string;
      };

      // Ajouter l'utilisateur à la requête
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      };

      next();
    } catch (error) {
      res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

/**
 * Middleware pour restreindre l'accès aux administrateurs
 */
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Non autorisé, accès administrateur requis' });
  }
};

/**
 * Middleware pour vérifier si l'utilisateur est le propriétaire de la ressource ou un administrateur
 * Exemple: vérifier si l'utilisateur peut accéder à ses propres commandes
 */
export const ownerOrAdmin = (resourceUserId: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      req.user && 
      (req.user.id === resourceUserId || req.user.role === 'ADMIN')
    ) {
      next();
    } else {
      res.status(403).json({ 
        message: "Non autorisé, vous n'êtes pas le propriétaire de cette ressource" 
      });
    }
  };
};
