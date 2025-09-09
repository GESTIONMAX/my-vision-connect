import express from 'express';
import collectionsRoutes from './collectionsRoutes';
import produitsRoutes from './produitsRoutes';
import variantesRoutes from './variantesRoutes';
import specificationsRoutes from './specificationsRoutes';
import assetsRoutes from './assetsRoutes';
import sportifCiblesRoutes from './sportifCiblesRoutes';

const router = express.Router();

// Enregistrement des routes
router.use('/collections', collectionsRoutes);
router.use('/produits', produitsRoutes);
router.use('/variantes', variantesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/assets', assetsRoutes);
router.use('/sportifs', sportifCiblesRoutes);

export default router;
