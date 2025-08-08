import { Request, Response } from 'express';
import { prisma } from '../app';

/**
 * Récupérer toutes les catégories
 */
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        parent: true,
        children: true
      }
    });
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupérer une catégorie par son ID
 */
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        products: true
      }
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Créer une nouvelle catégorie
 */
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, parentId } = req.body;
    
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        parentId
      }
    });
    
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Mettre à jour une catégorie
 */
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, parentId } = req.body;
    
    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        parentId
      }
    });
    
    res.json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Supprimer une catégorie
 */
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Vérifier si cette catégorie a des sous-catégories
    const childCategories = await prisma.category.findMany({
      where: { parentId: id }
    });
    
    if (childCategories.length > 0) {
      return res.status(400).json({ 
        message: 'Impossible de supprimer une catégorie qui a des sous-catégories' 
      });
    }
    
    // Vérifier si cette catégorie a des produits
    const products = await prisma.product.findMany({
      where: { categoryId: id }
    });
    
    if (products.length > 0) {
      return res.status(400).json({ 
        message: 'Impossible de supprimer une catégorie qui contient des produits' 
      });
    }
    
    await prisma.category.delete({
      where: { id }
    });
    
    res.json({ message: 'Catégorie supprimée' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupérer les sous-catégories d'une catégorie parente
 */
export const getSubcategories = async (req: Request, res: Response) => {
  try {
    const { parentId } = req.params;
    
    const categories = await prisma.category.findMany({
      where: { parentId },
      include: {
        children: true,
        products: true
      }
    });
    
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupérer les catégories de premier niveau
 */
export const getTopCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: true,
        products: true
      }
    });
    
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
