import express from 'express';
import * as orderController from '../controllers/orderController';

const router = express.Router();

/**
 * @route   GET /api/orders
 * @desc    Récupérer toutes les commandes (admin)
 * @access  Private/Admin
 */
router.get('/', orderController.getAllOrders);

/**
 * @route   GET /api/orders/user/:userId
 * @desc    Récupérer les commandes d'un utilisateur
 * @access  Private
 */
router.get('/user/:userId', orderController.getUserOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Récupérer une commande par son ID
 * @access  Private
 */
router.get('/:id', orderController.getOrderById);

/**
 * @route   POST /api/orders
 * @desc    Créer une nouvelle commande
 * @access  Private
 */
router.post('/', orderController.createOrder);

/**
 * @route   PUT /api/orders/:id
 * @desc    Mettre à jour le statut d'une commande
 * @access  Private/Admin
 */
router.put('/:id', orderController.updateOrderStatus);

/**
 * @route   DELETE /api/orders/:id
 * @desc    Annuler une commande
 * @access  Private/Admin
 */
router.delete('/:id', orderController.cancelOrder);

/**
 * @route   GET /api/orders/:id/items
 * @desc    Récupérer les produits d'une commande
 * @access  Private
 */
router.get('/:id/items', orderController.getOrderItems);

/**
 * @route   POST /api/orders/:id/payment
 * @desc    Traiter le paiement d'une commande
 * @access  Private
 */
router.post('/:id/payment', orderController.processPayment);

export default router;
