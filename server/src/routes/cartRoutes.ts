import express from 'express';
import * as cartController from '../controllers/cartController';

const router = express.Router();

/**
 * @route   GET /api/carts/:userId
 * @desc    Récupérer le panier d'un utilisateur
 * @access  Private
 */
router.get('/:userId', cartController.getCartByUser);

/**
 * @route   POST /api/carts/:userId
 * @desc    Créer un panier pour un utilisateur
 * @access  Private
 */
router.post('/:userId', cartController.createCart);

/**
 * @route   POST /api/carts/:cartId/items
 * @desc    Ajouter un produit au panier
 * @access  Private
 */
router.post('/:cartId/items', cartController.addItemToCart);

/**
 * @route   PUT /api/carts/:cartId/items/:itemId
 * @desc    Mettre à jour la quantité d'un produit dans le panier
 * @access  Private
 */
router.put('/:cartId/items/:itemId', cartController.updateCartItem);

/**
 * @route   DELETE /api/carts/:cartId/items/:itemId
 * @desc    Supprimer un produit du panier
 * @access  Private
 */
router.delete('/:cartId/items/:itemId', cartController.removeCartItem);

/**
 * @route   DELETE /api/carts/:cartId
 * @desc    Vider le panier
 * @access  Private
 */
router.delete('/:cartId', cartController.clearCart);

/**
 * @route   GET /api/carts/:cartId/total
 * @desc    Calculer le total du panier
 * @access  Private
 */
router.get('/:cartId/total', cartController.getCartTotal);

export default router;
