import express from 'express';
import * as productConfigController from '../controllers/productConfigController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(authenticate);

/**
 * @route GET /api/product-config
 * @desc Récupère toutes les configurations de produits de l'utilisateur
 * @access Private
 */
router.get('/', productConfigController.getUserConfigurations);

/**
 * @route GET /api/product-config/:id
 * @desc Récupère une configuration spécifique par son ID
 * @access Private
 */
router.get('/:id', productConfigController.getConfigurationById);

/**
 * @route GET /api/product-config/product/:produitId
 * @desc Récupère toutes les configurations d'un produit spécifique
 * @access Private
 */
router.get('/product/:produitId', productConfigController.getConfigurationsForProduct);

/**
 * @route POST /api/product-config
 * @desc Crée une nouvelle configuration de produit
 * @access Private
 */
router.post('/', productConfigController.createConfiguration);

/**
 * @route PUT /api/product-config/:id
 * @desc Met à jour une configuration existante
 * @access Private
 */
router.put('/:id', productConfigController.updateConfiguration);

/**
 * @route DELETE /api/product-config/:id
 * @desc Supprime une configuration
 * @access Private
 */
router.delete('/:id', productConfigController.deleteConfiguration);

/**
 * @route POST /api/product-config/calculate-price
 * @desc Calcule le prix pour une configuration donnée sans la sauvegarder
 * @access Private
 */
router.post('/calculate-price', productConfigController.calculatePrice);

export default router;
