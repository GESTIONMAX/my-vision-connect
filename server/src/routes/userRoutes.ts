import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Inscription d'un nouvel utilisateur
 * @access  Public
 */
router.post('/register', userController.register);

/**
 * @route   POST /api/users/login
 * @desc    Connexion d'un utilisateur
 * @access  Public
 */
router.post('/login', userController.login);

/**
 * @route   GET /api/users/profile
 * @desc    Obtenir le profil de l'utilisateur connecté
 * @access  Private
 */
router.get('/profile', userController.getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Mettre à jour le profil de l'utilisateur
 * @access  Private
 */
router.put('/profile', userController.updateUserProfile);

/**
 * @route   GET /api/users
 * @desc    Obtenir tous les utilisateurs
 * @access  Private/Admin
 */
router.get('/', userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Obtenir un utilisateur par son ID
 * @access  Private/Admin
 */
router.get('/:id', userController.getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Mettre à jour un utilisateur
 * @access  Private/Admin
 */
router.put('/:id', userController.updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Supprimer un utilisateur
 * @access  Private/Admin
 */
router.delete('/:id', userController.deleteUser);

export default router;
