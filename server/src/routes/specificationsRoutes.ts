import express from 'express';
import * as specificationController from '../controllers/specificationController';

const router = express.Router();

// Routes pour les spécifications
router.get('/', specificationController.getAllSpecifications);
router.get('/:id', specificationController.getSpecificationById);
router.get('/produit/:produitId', specificationController.getSpecificationsByProduit);
router.post('/', specificationController.createSpecification);
router.post('/batch', specificationController.createManySpecifications);
router.put('/:id', specificationController.updateSpecification);
router.delete('/:id', specificationController.deleteSpecification);

export default router;
