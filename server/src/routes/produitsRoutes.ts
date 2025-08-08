import express from 'express';
import * as produitController from '../controllers/produitController';

const router = express.Router();

// Routes pour les produits
router.get('/', produitController.getAllProduits);
router.get('/:id', produitController.getProduitById);
router.get('/slug/:slug', produitController.getProduitBySlug);
router.get('/collection/:collectionId', produitController.getProduitsByCollection);
router.get('/sportif/:sportifCibleId', produitController.getProduitsBySportifCible);
router.post('/', produitController.createProduit);
router.put('/:id', produitController.updateProduit);
router.delete('/:id', produitController.deleteProduit);

export default router;
