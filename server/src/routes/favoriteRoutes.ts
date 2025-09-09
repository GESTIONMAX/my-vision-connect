import express from 'express';
import * as favoriteController from '../controllers/favoriteController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(authenticate);

/**
 * @route GET /api/favorites
 * @desc Récupère tous les favoris de l'utilisateur
 * @access Private
 */
router.get('/', favoriteController.getUserFavorites);

/**
 * @route POST /api/favorites
 * @desc Ajoute un produit aux favoris
 * @access Private
 */
router.post('/', favoriteController.addFavorite);

/**
 * @route DELETE /api/favorites/:id
 * @desc Supprime un favori par son ID
 * @access Private
 */
router.delete('/:id', favoriteController.removeFavorite);

/**
 * @route DELETE /api/favorites/product/:produitId
 * @desc Supprime un favori par l'ID du produit
 * @access Private
 */
router.delete('/product/:produitId', favoriteController.removeFavoriteByProductId);

/**
 * @route POST /api/favorites/toggle
 * @desc Bascule un produit dans les favoris (ajout ou suppression)
 * @access Private
 */
router.post('/toggle', favoriteController.toggleFavorite);

/**
 * @route GET /api/favorites/check/:produitId
 * @desc Vérifie si un produit est dans les favoris de l'utilisateur
 * @access Private
 */
router.get('/check/:produitId', favoriteController.checkFavorite);

/**
 * @route DELETE /api/favorites/clear
 * @desc Supprime tous les favoris de l'utilisateur
 * @access Private
 */
router.delete('/clear', favoriteController.clearFavorites);

export default router;
