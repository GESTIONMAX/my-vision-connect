import { Request, Response } from 'express';
import { prisma } from '../app';

/**
 * Récupérer tous les produits
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    });
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupérer un produit par son ID
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true
      }
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Créer un nouveau produit
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, price, images, stock, categoryId, bestseller } = req.body;
    
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        images,
        stock: parseInt(stock || '0'),
        categoryId,
        bestseller: bestseller || false
      }
    });
    
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Mettre à jour un produit
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, price, images, stock, categoryId, bestseller } = req.body;
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price: price ? parseFloat(price) : undefined,
        images,
        stock: stock ? parseInt(stock) : undefined,
        categoryId,
        bestseller
      }
    });
    
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Supprimer un produit
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.product.delete({
      where: { id }
    });
    
    res.json({ message: 'Produit supprimé' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupérer les produits par catégorie
 */
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    
    const products = await prisma.product.findMany({
      where: { categoryId },
      include: {
        category: true
      }
    });
    
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupérer les produits bestsellers
 */
export const getBestsellers = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { bestseller: true },
      include: {
        category: true
      }
    });
    
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
