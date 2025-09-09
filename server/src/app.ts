import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import des routes
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import newRoutes from './routes/index';
import authRoutes from './routes/authRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
import productConfigRoutes from './routes/productConfigRoutes';

// Configuration de l'environnement
dotenv.config();

// Initialisation de Prisma
export const prisma = new PrismaClient();

// Initialisation de l'application Express
const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/new', newRoutes); // Nouvelles routes pour collections, produits, etc.
app.use('/api/auth', authRoutes); // Routes d'authentification
app.use('/api/favorites', favoriteRoutes); // Routes de favoris
app.use('/api/product-config', productConfigRoutes); // Routes de configuration de produits

// Route par défaut
app.get('/', (_req, res) => {
  res.json({ message: 'My Vision Connect API' });
});

// Gestion des erreurs
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Port d'écoute
const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app;
