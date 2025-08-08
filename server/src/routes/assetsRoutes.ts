import express from 'express';
import * as assetController from '../controllers/assetController';

const router = express.Router();

// Routes pour les assets
router.get('/', assetController.getAllAssets);
router.get('/:id', assetController.getAssetById);
router.get('/produit/:produitId', assetController.getAssetsByProduit);
router.get('/produit/:produitId/type/:type', assetController.getAssetsByProduitAndType);
router.post('/', assetController.createAsset);
router.post('/batch', assetController.createManyAssets);
router.put('/:id', assetController.updateAsset);
router.delete('/:id', assetController.deleteAsset);

export default router;
