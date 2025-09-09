// @ts-ignore - Pour éviter les avertissements d'import non utilisé
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

// Déclarer le type pour les propriétés manquantes du PrismaClient
declare module '@prisma/client' {
  interface PrismaClient {
    favorite: any;
  }
}

const prisma = new PrismaClient();

/**
 * Récupère tous les favoris de l'utilisateur connecté
 */
export const getUserFavorites = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        produit: {
          include: {
            collection: true,
            sportifCible: true,
            assets: {
              where: {
                type: 'IMAGE'
              },
              take: 1
            }
          }
        }
      }
    });

    return res.status(200).json({
      success: true,
      data: favorites
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des favoris',
      errors: error
    });
  }
};

/**
 * Ajoute un produit aux favoris
 */
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const { produitId } = req.body;

    if (!produitId) {
      return res.status(400).json({
        success: false,
        message: 'ID du produit requis'
      });
    }

    // Vérifier si le produit existe
    const produit = await prisma.produit.findUnique({
      where: { id: produitId }
    });

    if (!produit) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    // Vérifier si le favori existe déjà
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId,
        produitId
      }
    });

    if (existingFavorite) {
      return res.status(409).json({
        success: false,
        message: 'Ce produit est déjà dans vos favoris'
      });
    }

    // Créer le favori
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        produitId
      },
      include: {
        produit: true
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Produit ajouté aux favoris',
      data: favorite
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout aux favoris',
      errors: error
    });
  }
};

/**
 * Supprime un produit des favoris
 */
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const { id } = req.params;

    // Vérifier si le favori appartient à l'utilisateur
    const favorite = await prisma.favorite.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favori non trouvé ou non autorisé'
      });
    }

    // Supprimer le favori
    await prisma.favorite.delete({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: 'Produit retiré des favoris'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du favori:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du favori',
      errors: error
    });
  }
};

/**
 * Supprime un produit des favoris par ID de produit
 */
export const removeFavoriteByProductId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const { produitId } = req.params;

    // Vérifier si le favori existe
    const favorite = await prisma.favorite.findFirst({
      where: {
        userId,
        produitId
      }
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favori non trouvé'
      });
    }

    // Supprimer le favori
    await prisma.favorite.delete({
      where: { id: favorite.id }
    });

    return res.status(200).json({
      success: true,
      message: 'Produit retiré des favoris'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du favori:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du favori',
      errors: error
    });
  }
};

/**
 * Bascule (ajoute ou supprime) un produit des favoris
 */
export const toggleFavorite = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const { produitId } = req.body;

    if (!produitId) {
      return res.status(400).json({
        success: false,
        message: 'ID du produit requis'
      });
    }

    // Vérifier si le produit existe
    const produit = await prisma.produit.findUnique({
      where: { id: produitId }
    });

    if (!produit) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    // Vérifier si le favori existe déjà
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId,
        produitId
      }
    });

    let result;
    let message;

    if (existingFavorite) {
      // Supprimer le favori
      await prisma.favorite.delete({
        where: { id: existingFavorite.id }
      });
      result = null;
      message = 'Produit retiré des favoris';
    } else {
      // Créer le favori
      result = await prisma.favorite.create({
        data: {
          userId,
          produitId
        },
        include: {
          produit: true
        }
      });
      message = 'Produit ajouté aux favoris';
    }

    return res.status(200).json({
      success: true,
      message,
      data: result,
      isFavorite: !existingFavorite
    });
  } catch (error) {
    console.error('Erreur lors de la modification des favoris:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la modification des favoris',
      errors: error
    });
  }
};

/**
 * Vérifie si un produit est dans les favoris de l'utilisateur
 */
export const checkFavorite = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };
    const { produitId } = req.params;

    const favorite = await prisma.favorite.findFirst({
      where: {
        userId,
        produitId
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        isFavorite: !!favorite,
        favorite
      }
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du favori:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification du favori',
      errors: error
    });
  }
};

/**
 * Supprime tous les favoris de l'utilisateur
 */
export const clearFavorites = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string };

    await prisma.favorite.deleteMany({
      where: { userId }
    });

    return res.status(200).json({
      success: true,
      message: 'Tous les favoris ont été supprimés'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression des favoris:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression des favoris',
      errors: error
    });
  }
};
