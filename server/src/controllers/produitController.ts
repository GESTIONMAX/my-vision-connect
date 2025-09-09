import { Request, Response } from 'express';
import { prisma } from '../app';
// @ts-ignore: import nécessaire pour la déclaration de type
import { PrismaClient } from '@prisma/client';

// Ajouter une déclaration de type pour éviter les erreurs TypeScript
declare module '@prisma/client' {
  interface PrismaClient {
    produit: any;
  }
}

/**
 * Récupérer tous les produits
 */
export const getAllProduits = async (_req: Request, res: Response) => {
  try {
    const produits = await prisma.produit.findMany({
      include: {
        collection: true,
        sportifCible: true,
        variantes: true,
        specifications: true,
        assets: true
      }
    });
    
    res.json(produits);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer un produit par son ID
 */
export const getProduitById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const produit = await prisma.produit.findUnique({
      where: { id },
      include: {
        collection: true,
        sportifCible: true,
        variantes: true,
        specifications: true,
        assets: true
      }
    });

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(produit);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer un produit par son slug
 */
export const getProduitBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const produit = await prisma.produit.findUnique({
      where: { slug },
      include: {
        collection: true,
        sportifCible: true,
        variantes: true,
        specifications: true,
        assets: true
      }
    });

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(produit);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer les produits par collection
 */
export const getProduitsByCollection = async (req: Request, res: Response) => {
  try {
    const { collectionId } = req.params;

    const produits = await prisma.produit.findMany({
      where: { collectionId },
      include: {
        collection: true,
        sportifCible: true,
        variantes: true,
        specifications: true,
        assets: true
      }
    });

    res.json(produits);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer les produits par sportif cible
 */
export const getProduitsBySportifCible = async (req: Request, res: Response) => {
  try {
    const { sportifCibleId } = req.params;

    const produits = await prisma.produit.findMany({
      where: { sportifCibleId },
      include: {
        collection: true,
        sportifCible: true,
        variantes: true,
        specifications: true,
        assets: true
      }
    });

    res.json(produits);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Créer un nouveau produit
 */
export const createProduit = async (req: Request, res: Response) => {
  try {
    const { 
      nom, 
      slug, 
      description, 
      prix, 
      collectionId,
      sportifCibleId,
      variantes = [],
      specifications = [],
      assets = []
    } = req.body;

    // Vérifier si le slug existe déjà
    const existingProduit = await prisma.produit.findUnique({
      where: { slug }
    });

    if (existingProduit) {
      return res.status(400).json({ message: 'Un produit avec ce slug existe déjà' });
    }

    // Créer le produit et ses relations en une seule transaction
    const produit = await prisma.produit.create({
      data: {
        nom,
        slug,
        description,
        prix,
        collectionId,
        sportifCibleId,
        variantes: {
          create: variantes
        },
        specifications: {
          create: specifications
        },
        assets: {
          create: assets
        }
      },
      include: {
        collection: true,
        sportifCible: true,
        variantes: true,
        specifications: true,
        assets: true
      }
    });

    res.status(201).json(produit);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Mettre à jour un produit
 */
export const updateProduit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      nom, 
      slug, 
      description, 
      prix, 
      collectionId,
      sportifCibleId
    } = req.body;

    // Vérifier si le produit existe
    const existingProduit = await prisma.produit.findUnique({
      where: { id }
    });

    if (!existingProduit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    // Vérifier si le nouveau slug existe déjà (si changé)
    if (slug && slug !== existingProduit.slug) {
      const slugExists = await prisma.produit.findUnique({
        where: { slug }
      });

      if (slugExists) {
        return res.status(400).json({ message: 'Un produit avec ce slug existe déjà' });
      }
    }

    const updatedProduit = await prisma.produit.update({
      where: { id },
      data: {
        nom,
        slug,
        description,
        prix,
        collectionId,
        sportifCibleId
      },
      include: {
        collection: true,
        sportifCible: true,
        variantes: true,
        specifications: true,
        assets: true
      }
    });

    res.json(updatedProduit);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Supprimer un produit
 */
export const deleteProduit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Vérifier si le produit existe
    const existingProduit = await prisma.produit.findUnique({
      where: { id }
    });

    if (!existingProduit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    await prisma.produit.delete({
      where: { id }
    });

    res.json({ message: 'Produit supprimé avec succès' });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};
