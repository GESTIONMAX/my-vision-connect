import { Request, Response } from 'express';
import { prisma } from '../app';
import { OrderStatus } from '@prisma/client';

/**
 * Récupérer toutes les commandes (admin)
 */
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        },
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupérer les commandes d'un utilisateur
 */
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupérer une commande par son ID
 */
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        },
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Créer une nouvelle commande
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, cartId, shippingAddress, billingAddress } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Récupérer le panier
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

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Panier vide ou non trouvé' });
    }

    // Calculer le total
    let totalAmount = 0;
    for (const item of cart.items) {
      totalAmount += item.product.price * item.quantity;
    }

    // Créer la commande
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        shippingAddress,
        billingAddress,
        status: OrderStatus.PENDING,
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Désactiver le panier ou le vider
    await prisma.cart.update({
      where: { id: cartId },
      data: { active: false }
    });

    // Créer un nouveau panier pour l'utilisateur
    const newCart = await prisma.cart.create({
      data: {
        userId,
        active: true
      }
    });

    res.status(201).json({
      order,
      newCart
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Mettre à jour le statut d'une commande
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Vérifier si le statut est valide
    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
      return res.status(400).json({ message: 'Statut de commande invalide' });
    }

    const order = await prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Mettre à jour le statut
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: status as OrderStatus },
      include: {
        items: true
      }
    });

    res.json(updatedOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Annuler une commande
 */
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Vérifier si la commande peut être annulée
    if (
      order.status === OrderStatus.DELIVERED ||
      order.status === OrderStatus.COMPLETED ||
      order.status === OrderStatus.CANCELLED
    ) {
      return res.status(400).json({
        message: `Impossible d'annuler une commande avec le statut ${order.status}`
      });
    }

    // Annuler la commande
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELLED },
      include: {
        items: true
      }
    });

    res.json(updatedOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Récupérer les produits d'une commande
 */
export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(order.items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Traiter le paiement d'une commande
 */
export const processPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { paymentMethod, paymentDetails } = req.body;

    const order = await prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Dans une implémentation réelle, vous intégreriez ici un processeur de paiement
    // comme Stripe, PayPal, etc.

    // Simuler un processus de paiement réussi
    const paymentSuccess = true;

    if (paymentSuccess) {
      // Mettre à jour le statut de la commande
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: { 
          status: OrderStatus.PAID,
          paymentMethod,
          paymentDetails: JSON.stringify(paymentDetails)
        }
      });

      res.json({
        success: true,
        message: 'Paiement traité avec succès',
        order: updatedOrder
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Échec du traitement du paiement'
      });
    }
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};
