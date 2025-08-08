import express from 'express';
import * as categoryController from '../controllers/categoryController';

const router = express.Router();

/**
 * @route   GET /api/categories
 * @desc    Récupérer toutes les catégories
 * @access  Public
 */
router.get('/', categoryController.getAllCategories);

/**
 * @route   GET /api/categories/:id
 * @desc    Récupérer une catégorie par son ID
 * @access  Public
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @route   POST /api/categories
 * @desc    Créer une nouvelle catégorie
 * @access  Private/Admin
 */
router.post('/', categoryController.createCategory);

/**
 * @route   PUT /api/categories/:id
 * @desc    Mettre à jour une catégorie
 * @access  Private/Admin
 */
router.put('/:id', categoryController.updateCategory);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Supprimer une catégorie
 * @access  Private/Admin
 */
router.delete('/:id', categoryController.deleteCategory);

/**
 * @route   GET /api/categories/parent/:parentId
 * @desc    Récupérer les sous-catégories d'une catégorie parente
 * @access  Public
 */
router.get('/parent/:parentId', categoryController.getSubcategories);

/**
 * @route   GET /api/categories/top
 * @desc    Récupérer les catégories de premier niveau
 * @access  Public
 */
router.get('/top', categoryController.getTopCategories);

export default router;
