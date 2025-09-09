import express from 'express';
import * as varianteController from '../controllers/varianteController';

const router = express.Router();

// Routes pour les variantes
router.get('/', varianteController.getAllVariantes);
router.get('/:id', varianteController.getVarianteById);
router.get('/produit/:produitId', varianteController.getVariantesByProduit);
router.get('/sku/:sku', varianteController.getVarianteBySKU);
router.post('/', varianteController.createVariante);
router.post('/batch', varianteController.createManyVariantes);
router.put('/:id', varianteController.updateVariante);
router.put('/:id/stock', varianteController.updateVarianteStock);
router.delete('/:id', varianteController.deleteVariante);

export default router;
