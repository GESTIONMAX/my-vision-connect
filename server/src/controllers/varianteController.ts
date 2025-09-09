import { Request, Response } from 'express';
import { prisma } from '../app';
// @ts-ignore: import nécessaire pour la déclaration de type
import { PrismaClient } from '@prisma/client';

// Ajouter une déclaration de type pour éviter les erreurs TypeScript
declare module '@prisma/client' {
  interface PrismaClient {
    variante: any;
    produit: any;
  }
}

/**
 * Récupérer toutes les variantes
 */
export const getAllVariantes = async (_req: Request, res: Response) => {
  try {
    const variantes = await prisma.variante.findMany({
      include: {
        produit: true
      }
    });
    
    res.json(variantes);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer les variantes d'un produit
 */
export const getVariantesByProduit = async (req: Request, res: Response) => {
  try {
    const { produitId } = req.params;

    const variantes = await prisma.variante.findMany({
      where: { produitId },
      include: {
        produit: true
      }
    });

    res.json(variantes);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer une variante par son ID
 */
export const getVarianteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const variante = await prisma.variante.findUnique({
      where: { id },
      include: {
        produit: true
      }
    });

    if (!variante) {
      return res.status(404).json({ message: 'Variante non trouvée' });
    }

    res.json(variante);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer une variante par son SKU
 */
export const getVarianteBySKU = async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;

    const variante = await prisma.variante.findUnique({
      where: { sku },
      include: {
        produit: true
      }
    });

    if (!variante) {
      return res.status(404).json({ message: 'Variante non trouvée' });
    }

    res.json(variante);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Créer une nouvelle variante
 */
export const createVariante = async (req: Request, res: Response) => {
  try {
    const { sku, couleur, taille, stock, prix, produitId } = req.body;

    // Vérifier si le produit existe
    const produit = await prisma.produit.findUnique({
      where: { id: produitId }
    });

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    // Vérifier si le SKU existe déjà
    const existingVariante = await prisma.variante.findUnique({
      where: { sku }
    });

    if (existingVariante) {
      return res.status(400).json({ message: 'Une variante avec ce SKU existe déjà' });
    }

    const variante = await prisma.variante.create({
      data: {
        sku,
        couleur,
        taille,
        stock,
        prix,
        produitId
      },
      include: {
        produit: true
      }
    });

    res.status(201).json(variante);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Créer plusieurs variantes en une seule requête
 */
export const createManyVariantes = async (req: Request, res: Response) => {
  try {
    const { variantes } = req.body; // Un tableau d'objets variante { sku, couleur, taille, stock, prix, produitId }
    
    if (!Array.isArray(variantes) || variantes.length === 0) {
      return res.status(400).json({ message: 'Veuillez fournir un tableau de variantes' });
    }
    
    // Vérifier si tous les produits existent
    const produitIds = [...new Set(variantes.map(var_ => var_.produitId))];
    const existingProduits = await prisma.produit.findMany({
      where: { id: { in: produitIds } }
    });
    
    if (existingProduits.length !== produitIds.length) {
      return res.status(404).json({ message: 'Un ou plusieurs produits référencés n\'existent pas' });
    }
    
    // Vérifier si des SKUs existent déjà
    const skus = variantes.map((var_: any) => var_.sku);
    const existingSkus = await prisma.variante.findMany({
      where: { sku: { in: skus } },
      select: { sku: true }
    });
    
    if (existingSkus.length > 0) {
      return res.status(400).json({ 
        message: 'Les SKUs suivants existent déjà', 
        skus: existingSkus.map((v: any) => v.sku) 
      });
    }
    
    // Créer toutes les variantes
    const createdVariantes = await prisma.$transaction(
      variantes.map(var_ => 
        prisma.variante.create({
          data: {
            sku: var_.sku,
            couleur: var_.couleur,
            taille: var_.taille,
            stock: var_.stock || 0,
            prix: var_.prix,
            produitId: var_.produitId
          }
        })
      )
    );
    
    res.status(201).json(createdVariantes);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Mettre à jour une variante
 */
export const updateVariante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { couleur, taille, stock, prix } = req.body;

    // Vérifier si la variante existe
    const existingVariante = await prisma.variante.findUnique({
      where: { id }
    });

    if (!existingVariante) {
      return res.status(404).json({ message: 'Variante non trouvée' });
    }

    const updatedVariante = await prisma.variante.update({
      where: { id },
      data: {
        couleur,
        taille,
        stock,
        prix
      },
      include: {
        produit: true
      }
    });

    res.json(updatedVariante);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Mettre à jour le stock d'une variante
 */
export const updateVarianteStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (stock === undefined || typeof stock !== 'number') {
      return res.status(400).json({ message: 'Le stock doit être un nombre' });
    }

    // Vérifier si la variante existe
    const existingVariante = await prisma.variante.findUnique({
      where: { id }
    });

    if (!existingVariante) {
      return res.status(404).json({ message: 'Variante non trouvée' });
    }

    const updatedVariante = await prisma.variante.update({
      where: { id },
      data: { stock },
      include: {
        produit: true
      }
    });

    res.json(updatedVariante);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Supprimer une variante
 */
export const deleteVariante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Vérifier si la variante existe
    const existingVariante = await prisma.variante.findUnique({
      where: { id }
    });

    if (!existingVariante) {
      return res.status(404).json({ message: 'Variante non trouvée' });
    }

    await prisma.variante.delete({
      where: { id }
    });

    res.json({ message: 'Variante supprimée avec succès' });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};
