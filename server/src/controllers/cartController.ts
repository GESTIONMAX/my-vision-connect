import { Request, Response } from 'express';
import { prisma } from '../app';

/**
 * Récupérer le panier d'un utilisateur
 */
export const getCartByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Rechercher le panier actif de l'utilisateur
    let cart = await prisma.cart.findFirst({
      where: { 
        userId,
        active: true
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Si aucun panier actif n'existe, en créer un nouveau
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
          active: true
        },
        include: {
          items: true
        }
      });
    }

    res.json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Créer un panier pour un utilisateur
 */
export const createCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si un panier actif existe déjà
    const existingCart = await prisma.cart.findFirst({
      where: {
        userId,
        active: true
      }
    });

    if (existingCart) {
      return res.status(400).json({ 
        message: 'Un panier actif existe déjà pour cet utilisateur',
        cart: existingCart 
      });
    }

    // Créer un nouveau panier
    const cart = await prisma.cart.create({
      data: {
        userId,
        active: true
      }
    });

    res.status(201).json(cart);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Ajouter un produit au panier
 */
export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity = 1 } = req.body;

    // Vérifier si le panier existe
    const cart = await prisma.cart.findUnique({
      where: { id: cartId }
    });

    if (!cart) {
      return res.status(404).json({ message: 'Panier non trouvé' });
    }

    // Vérifier si le produit existe
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    // Vérifier si le produit est déjà dans le panier
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId,
        productId
      }
    });

    if (existingItem) {
      // Mettre à jour la quantité
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity
        },
        include: {
          product: true
        }
      });

      return res.json(updatedItem);
    }

    // Ajouter le nouveau produit au panier
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity
      },
      include: {
        product: true
      }
    });

    res.status(201).json(cartItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Mettre à jour la quantité d'un produit dans le panier
 */
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { cartId, itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: 'La quantité doit être supérieure à 0' });
    }

    // Vérifier si le panier existe
    const cart = await prisma.cart.findUnique({
      where: { id: cartId }
    });

    if (!cart) {
      return res.status(404).json({ message: 'Panier non trouvé' });
    }

    // Vérifier si l'item existe et appartient au panier spécifié
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cartId
      }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item du panier non trouvé' });
    }

    // Mettre à jour la quantité
    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        product: true
      }
    });

    res.json(updatedItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Supprimer un produit du panier
 */
export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { cartId, itemId } = req.params;

    // Vérifier si le panier existe
    const cart = await prisma.cart.findUnique({
      where: { id: cartId }
    });

    if (!cart) {
      return res.status(404).json({ message: 'Panier non trouvé' });
    }

    // Vérifier si l'item existe et appartient au panier spécifié
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cartId
      }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item du panier non trouvé' });
    }

    // Supprimer l'item
    await prisma.cartItem.delete({
      where: { id: itemId }
    });

    res.json({ message: 'Item supprimé du panier' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Vider le panier
 */
export const clearCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;

    // Vérifier si le panier existe
    const cart = await prisma.cart.findUnique({
      where: { id: cartId }
    });

    if (!cart) {
      return res.status(404).json({ message: 'Panier non trouvé' });
    }

    // Supprimer tous les items du panier
    await prisma.cartItem.deleteMany({
      where: { cartId }
    });

    res.json({ message: 'Panier vidé' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Calculer le total du panier
 */
export const getCartTotal = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;

    // Vérifier si le panier existe
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!cart) {
      return res.status(404).json({ message: 'Panier non trouvé' });
    }

    // Calculer le total
    let total = 0;
    for (const item of cart.items) {
      total += item.product.price * item.quantity;
    }

    res.json({
      total,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      items: cart.items
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
