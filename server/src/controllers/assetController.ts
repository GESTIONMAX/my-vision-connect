import { Request, Response } from 'express';
import { prisma } from '../app';
// @ts-ignore: import nécessaire pour la déclaration de type
import { PrismaClient } from '@prisma/client';

// Ajouter une déclaration de type pour éviter les erreurs TypeScript
declare module '@prisma/client' {
  interface PrismaClient {
    asset: any;
    produit: any;
  }
}

// Définir l'enum AssetType manuellement puisqu'il n'est pas exporté par @prisma/client
enum AssetType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  MODEL_3D = 'MODEL_3D',
  DOCUMENT = 'DOCUMENT'
}

/**
 * Récupérer tous les assets
 */
export const getAllAssets = async (_req: Request, res: Response) => {
  try {
    const assets = await prisma.asset.findMany({
      include: {
        produit: true
      }
    });
    
    res.json(assets);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer les assets d'un produit
 */
export const getAssetsByProduit = async (req: Request, res: Response) => {
  try {
    const { produitId } = req.params;

    const assets = await prisma.asset.findMany({
      where: { produitId },
      include: {
        produit: true
      }
    });

    res.json(assets);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer les assets d'un produit par type
 */
export const getAssetsByProduitAndType = async (req: Request, res: Response) => {
  try {
    const { produitId, type } = req.params;

    const assets = await prisma.asset.findMany({
      where: { 
        produitId,
        type: type as AssetType
      },
      include: {
        produit: true
      }
    });

    res.json(assets);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Récupérer un asset par son ID
 */
export const getAssetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        produit: true
      }
    });

    if (!asset) {
      return res.status(404).json({ message: 'Asset non trouvé' });
    }

    res.json(asset);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

/**
 * Créer un nouvel asset
 */
export const createAsset = async (req: Request, res: Response) => {
  try {
    const { type, url, titre, produitId } = req.body;

    // Vérifier si le produit existe
    const produit = await prisma.produit.findUnique({
      where: { id: produitId }
    });

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    // Vérifier si le type est valide
    if (!Object.values(AssetType).includes(type)) {
      return res.status(400).json({ 
        message: 'Type d\'asset non valide',
        validTypes: Object.values(AssetType)
      });
    }

    const asset = await prisma.asset.create({
      data: {
        type,
        url,
        titre,
        produitId
      },
      include: {
        produit: true
      }
    });

    res.status(201).json(asset);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Créer plusieurs assets en une seule requête
 */
export const createManyAssets = async (req: Request, res: Response) => {
  try {
    const { assets } = req.body; // Un tableau d'objets asset { type, url, titre, produitId }
    
    if (!Array.isArray(assets) || assets.length === 0) {
      return res.status(400).json({ message: 'Veuillez fournir un tableau d\'assets' });
    }
    
    // Vérifier si tous les produits existent
    const produitIds = [...new Set(assets.map(asset => asset.produitId))];
    const existingProduits = await prisma.produit.findMany({
      where: { id: { in: produitIds } }
    });
    
    if (existingProduits.length !== produitIds.length) {
      return res.status(404).json({ message: 'Un ou plusieurs produits référencés n\'existent pas' });
    }
    
    // Vérifier si tous les types sont valides
    const invalidTypes = assets
      .map(asset => asset.type)
      .filter(type => !Object.values(AssetType).includes(type));
    
    if (invalidTypes.length > 0) {
      return res.status(400).json({ 
        message: 'Types d\'asset non valides',
        invalidTypes,
        validTypes: Object.values(AssetType)
      });
    }
    
    // Créer tous les assets
    const createdAssets = await prisma.$transaction(
      assets.map(asset => 
        prisma.asset.create({
          data: {
            type: asset.type,
            url: asset.url,
            titre: asset.titre,
            produitId: asset.produitId
          }
        })
      )
    );
    
    res.status(201).json(createdAssets);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Mettre à jour un asset
 */
export const updateAsset = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, url, titre } = req.body;

    // Vérifier si l'asset existe
    const existingAsset = await prisma.asset.findUnique({
      where: { id }
    });

    if (!existingAsset) {
      return res.status(404).json({ message: 'Asset non trouvé' });
    }

    // Vérifier si le type est valide
    if (type && !Object.values(AssetType).includes(type)) {
      return res.status(400).json({ 
        message: 'Type d\'asset non valide',
        validTypes: Object.values(AssetType)
      });
    }

    const updatedAsset = await prisma.asset.update({
      where: { id },
      data: {
        type,
        url,
        titre
      },
      include: {
        produit: true
      }
    });

    res.json(updatedAsset);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * Supprimer un asset
 */
export const deleteAsset = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Vérifier si l'asset existe
    const existingAsset = await prisma.asset.findUnique({
      where: { id }
    });

    if (!existingAsset) {
      return res.status(404).json({ message: 'Asset non trouvé' });
    }

    await prisma.asset.delete({
      where: { id }
    });

    res.json({ message: 'Asset supprimé avec succès' });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};
