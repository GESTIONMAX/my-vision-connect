import express from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Inscription d'un nouvel utilisateur
 * @access Public
 */
router.post('/register', authController.register);

/**
 * @route POST /api/auth/login
 * @desc Connexion d'un utilisateur
 * @access Public
 */
router.post('/login', authController.login);

/**
 * @route POST /api/auth/logout
 * @desc Déconnexion d'un utilisateur
 * @access Private
 */
router.post('/logout', authenticate, authController.logout);

/**
 * @route GET /api/auth/profile
 * @desc Récupération du profil de l'utilisateur connecté
 * @access Private
 */
router.get('/profile', authenticate, authController.getProfile);

/**
 * @route PUT /api/auth/profile
 * @desc Mise à jour du profil de l'utilisateur connecté
 * @access Private
 */
router.put('/profile', authenticate, authController.updateProfile);

/**
 * @route POST /api/auth/refresh-token
 * @desc Rafraîchissement du token JWT
 * @access Public
 */
router.post('/refresh-token', authController.refreshToken);

/**
 * @route POST /api/auth/password-reset-request
 * @desc Demande de réinitialisation du mot de passe
 * @access Public
 */
router.post('/password-reset-request', authController.requestPasswordReset);

/**
 * @route GET /api/auth/check
 * @desc Vérification de l'état d'authentification
 * @access Private
 */
router.get('/check', authenticate, authController.checkAuth);

export default router;
