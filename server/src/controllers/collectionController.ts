import { Request, Response } from 'express';
import { prisma } from '../app';
// @ts-ignore: import nécessaire pour la déclaration de type
import { PrismaClient } from '@prisma/client';

// Ajouter une déclaration de type pour éviter les erreurs TypeScript
declare module '@prisma/client' {
  interface PrismaClient {
    collection: any;
  }
}

/**
 * Récupérer toutes les collections
 */
export const getAllCollections = async (_req: Request, res: Response) => {
  try {
    const collections = await prisma.collection.findMany({
      include: {
        produits: true
      }
    });
    
    res.json(collections);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer une collection par son ID
 */
export const getCollectionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const collection = await prisma.collection.findUnique({
      where: { id },
      include: {
        produits: true
      }
    });

    if (!collection) {
      return res.status(404).json({ message: 'Collection non trouvée' });
    }

    res.json(collection);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer une collection par son slug
 */
export const getCollectionBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const collection = await prisma.collection.findUnique({
      where: { slug },
      include: {
        produits: true
      }
    });

    if (!collection) {
      return res.status(404).json({ message: 'Collection non trouvée' });
    }

    res.json(collection);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Créer une nouvelle collection
 */
export const createCollection = async (req: Request, res: Response) => {
  try {
    const { nom, slug, description, image, active = true } = req.body;

    // Vérifier si le slug existe déjà
    const existingCollection = await prisma.collection.findUnique({
      where: { slug }
    });

    if (existingCollection) {
      return res.status(400).json({ message: 'Une collection avec ce slug existe déjà' });
    }

    const collection = await prisma.collection.create({
      data: {
        nom,
        slug,
        description,
        image,
        active
      }
    });

    res.status(201).json(collection);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Mettre à jour une collection
 */
export const updateCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nom, slug, description, image, active } = req.body;

    // Vérifier si la collection existe
    const existingCollection = await prisma.collection.findUnique({
      where: { id }
    });

    if (!existingCollection) {
      return res.status(404).json({ message: 'Collection non trouvée' });
    }

    // Vérifier si le nouveau slug existe déjà (si changé)
    if (slug && slug !== existingCollection.slug) {
      const slugExists = await prisma.collection.findUnique({
        where: { slug }
      });

      if (slugExists) {
        return res.status(400).json({ message: 'Une collection avec ce slug existe déjà' });
      }
    }

    const updatedCollection = await prisma.collection.update({
      where: { id },
      data: {
        nom,
        slug,
        description,
        image,
        active
      }
    });

    res.json(updatedCollection);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Supprimer une collection
 */
export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Vérifier si la collection existe
    const existingCollection = await prisma.collection.findUnique({
      where: { id }
    });

    if (!existingCollection) {
      return res.status(404).json({ message: 'Collection non trouvée' });
    }

    await prisma.collection.delete({
      where: { id }
    });

    res.json({ message: 'Collection supprimée avec succès' });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};
