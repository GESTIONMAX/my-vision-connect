import express from 'express';
import * as productController from '../controllers/productController';

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Récupérer tous les produits
 * @access  Public
 */
router.get('/', productController.getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Récupérer un produit par son ID
 * @access  Public
 */
router.get('/:id', productController.getProductById);

/**
 * @route   POST /api/products
 * @desc    Créer un nouveau produit
 * @access  Private/Admin
 */
router.post('/', productController.createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Mettre à jour un produit
 * @access  Private/Admin
 */
router.put('/:id', productController.updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Supprimer un produit
 * @access  Private/Admin
 */
router.delete('/:id', productController.deleteProduct);

/**
 * @route   GET /api/products/category/:categoryId
 * @desc    Récupérer les produits par catégorie
 * @access  Public
 */
router.get('/category/:categoryId', productController.getProductsByCategory);

/**
 * @route   GET /api/products/bestsellers
 * @desc    Récupérer les produits bestsellers
 * @access  Public
 */
router.get('/bestsellers', productController.getBestsellers);

export default router;
