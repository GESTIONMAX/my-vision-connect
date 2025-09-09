import { Request, Response } from 'express';
import { prisma } from '../app';
// @ts-ignore: import nécessaire pour la déclaration de type
import { PrismaClient } from '@prisma/client';

// Ajouter une déclaration de type pour éviter les erreurs TypeScript
declare module '@prisma/client' {
  interface PrismaClient {
    specification: any;
    produit: any;
  }
}

/**
 * Récupérer toutes les spécifications
 */
export const getAllSpecifications = async (_req: Request, res: Response) => {
  try {
    const specifications = await prisma.specification.findMany({
      include: {
        produit: true
      }
    });
    
    res.json(specifications);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer les spécifications par produit
 */
export const getSpecificationsByProduit = async (req: Request, res: Response) => {
  try {
    const { produitId } = req.params;

    const specifications = await prisma.specification.findMany({
      where: { produitId },
      include: {
        produit: true
      }
    });

    res.json(specifications);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer une spécification par son ID
 */
export const getSpecificationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const specification = await prisma.specification.findUnique({
      where: { id },
      include: {
        produit: true
      }
    });

    if (!specification) {
      return res.status(404).json({ message: 'Spécification non trouvée' });
    }

    res.json(specification);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Créer une nouvelle spécification
 */
export const createSpecification = async (req: Request, res: Response) => {
  try {
    const { produitId, nom, valeur } = req.body;

    // Vérifier si le produit existe
    const produit = await prisma.produit.findUnique({
      where: { id: produitId }
    });

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    // Mise à jour du schéma pour inclure la catégorie (si nécessaire)
    // Cette partie peut nécessiter une migration de la base de données

    const specification = await prisma.specification.create({
      data: {
        nom,
        valeur,
        produitId
      },
      include: {
        produit: true
      }
    });

    res.status(201).json(specification);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Créer plusieurs spécifications en une seule requête
 */
export const createManySpecifications = async (req: Request, res: Response) => {
  try {
    const { specifications } = req.body; // Un tableau d'objets spécification { nom, valeur, produitId }
    
    if (!Array.isArray(specifications) || specifications.length === 0) {
      return res.status(400).json({ message: 'Veuillez fournir un tableau de spécifications' });
    }
    
    // Vérifier si tous les produits existent
    const produitIds = [...new Set(specifications.map(spec => spec.produitId))];
    const existingProduits = await prisma.produit.findMany({
      where: { id: { in: produitIds } }
    });
    
    if (existingProduits.length !== produitIds.length) {
      return res.status(404).json({ message: 'Un ou plusieurs produits référencés n\'existent pas' });
    }
    
    // Créer toutes les spécifications
    const createdSpecifications = await prisma.$transaction(
      specifications.map(spec => 
        prisma.specification.create({
          data: {
            nom: spec.nom,
            valeur: spec.valeur,
            produitId: spec.produitId
          }
        })
      )
    );
    
    res.status(201).json(createdSpecifications);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Mettre à jour une spécification
 */
export const updateSpecification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nom, valeur } = req.body;

    // Vérifier si la spécification existe
    const existingSpecification = await prisma.specification.findUnique({
      where: { id }
    });

    if (!existingSpecification) {
      return res.status(404).json({ message: 'Spécification non trouvée' });
    }

    const updatedSpecification = await prisma.specification.update({
      where: { id },
      data: {
        nom,
        valeur
      },
      include: {
        produit: true
      }
    });

    res.json(updatedSpecification);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Supprimer une spécification
 */
export const deleteSpecification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Vérifier si la spécification existe
    const existingSpecification = await prisma.specification.findUnique({
      where: { id }
    });

    if (!existingSpecification) {
      return res.status(404).json({ message: 'Spécification non trouvée' });
    }

    await prisma.specification.delete({
      where: { id }
    });

    res.json({ message: 'Spécification supprimée avec succès' });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};
