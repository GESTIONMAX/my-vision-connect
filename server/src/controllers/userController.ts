import { Request, Response } from 'express';
import { prisma } from '../app';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Constante pour le secret JWT
const JWT_SECRET = process.env.JWT_SECRET || 'secret_temporaire_a_changer';

/**
 * Inscription d'un nouvel utilisateur
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'USER'
      }
    });

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Connexion d'un utilisateur
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.password) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Obtenir le profil de l'utilisateur connecté
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // Note: Cette fonction nécessiterait un middleware d'authentification
    // qui ajouterait user.id à l'objet req
    const userId = (req as any).user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Ne pas inclure le mot de passe
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Mettre à jour le profil de l'utilisateur
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    // Note: Cette fonction nécessiterait un middleware d'authentification
    const userId = (req as any).user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    const { email, password, firstName, lastName } = req.body;

    // Préparer les données de mise à jour
    const updateData: any = {};
    
    if (email) updateData.email = email;
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;

    // Si un nouveau mot de passe est fourni, le hasher
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Ne pas inclure le mot de passe
      }
    });

    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Obtenir tous les utilisateurs (admin)
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Note: Cette fonction nécessiterait un middleware d'authentification admin
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Ne pas inclure le mot de passe
      }
    });

    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Obtenir un utilisateur par son ID (admin)
 */
export const getUserById = async (req: Request, res: Response) => {
  try {
    // Note: Cette fonction nécessiterait un middleware d'authentification admin
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Ne pas inclure le mot de passe
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Mettre à jour un utilisateur (admin)
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Note: Cette fonction nécessiterait un middleware d'authentification admin
    const { id } = req.params;
    const { email, password, firstName, lastName, role } = req.body;

    // Préparer les données de mise à jour
    const updateData: any = {};
    
    if (email) updateData.email = email;
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (role) updateData.role = role;

    // Si un nouveau mot de passe est fourni, le hasher
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Ne pas inclure le mot de passe
      }
    });

    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Supprimer un utilisateur (admin)
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Note: Cette fonction nécessiterait un middleware d'authentification admin
    const { id } = req.params;

    await prisma.user.delete({
      where: { id }
    });

    res.json({ message: 'Utilisateur supprimé' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
