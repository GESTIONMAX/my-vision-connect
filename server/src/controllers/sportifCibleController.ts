import { Request, Response } from 'express';
import { prisma } from '../app';

// Ajouter une déclaration de type pour éviter les erreurs TypeScript
declare module '@prisma/client' {
  interface PrismaClient {
    sportifCible: any;
    produit: any;
  }
}

/**
 * Récupérer tous les sportifs cibles
 */
export const getAllSportifCibles = async (_req: Request, res: Response) => {
  try {
    const sportifCibles = await prisma.sportifCible.findMany({
      include: {
        produits: true
      }
    });
    
    res.json(sportifCibles);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer un sportif cible par son ID
 */
export const getSportifCibleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const sportifCible = await prisma.sportifCible.findUnique({
      where: { id },
      include: {
        produits: true
      }
    });

    if (!sportifCible) {
      return res.status(404).json({ message: 'Sportif cible non trouvé' });
    }

    res.json(sportifCible);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer un sportif cible par son nom
 */
export const getSportifCibleByNom = async (req: Request, res: Response) => {
  try {
    const { nom } = req.params;

    const sportifCible = await prisma.sportifCible.findUnique({
      where: { nom },
      include: {
        produits: true
      }
    });

    if (!sportifCible) {
      return res.status(404).json({ message: 'Sportif cible non trouvé' });
    }

    res.json(sportifCible);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Créer un nouveau sportif cible
 */
export const createSportifCible = async (req: Request, res: Response) => {
  try {
    const { nom, description } = req.body;

    // Vérifier si le nom existe déjà
    const existingSportifCible = await prisma.sportifCible.findUnique({
      where: { nom }
    });

    if (existingSportifCible) {
      return res.status(400).json({ message: 'Un sportif cible avec ce nom existe déjà' });
    }

    const sportifCible = await prisma.sportifCible.create({
      data: {
        nom,
        description
      }
    });

    res.status(201).json(sportifCible);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Mettre à jour un sportif cible
 */
export const updateSportifCible = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nom, description } = req.body;

    // Vérifier si le sportif cible existe
    const existingSportifCible = await prisma.sportifCible.findUnique({
      where: { id }
    });

    if (!existingSportifCible) {
      return res.status(404).json({ message: 'Sportif cible non trouvé' });
    }

    // Vérifier si le nouveau nom existe déjà (si changé)
    if (nom && nom !== existingSportifCible.nom) {
      const nomExists = await prisma.sportifCible.findUnique({
        where: { nom }
      });

      if (nomExists) {
        return res.status(400).json({ message: 'Un sportif cible avec ce nom existe déjà' });
      }
    }

    const updatedSportifCible = await prisma.sportifCible.update({
      where: { id },
      data: {
        nom,
        description
      },
      include: {
        produits: true
      }
    });

    res.json(updatedSportifCible);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Supprimer un sportif cible
 */
export const deleteSportifCible = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Vérifier si le sportif cible existe
    const existingSportifCible = await prisma.sportifCible.findUnique({
      where: { id }
    });

    if (!existingSportifCible) {
      return res.status(404).json({ message: 'Sportif cible non trouvé' });
    }

    // Vérifier s'il y a des produits associés
    const productsCount = await prisma.produit.count({
      where: { sportifCibleId: id }
    });

    if (productsCount > 0) {
      return res.status(400).json({ 
        message: `Impossible de supprimer ce sportif cible car il est associé à ${productsCount} produit(s)`,
        count: productsCount
      });
    }

    await prisma.sportifCible.delete({
      where: { id }
    });

    res.json({ message: 'Sportif cible supprimé avec succès' });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};
