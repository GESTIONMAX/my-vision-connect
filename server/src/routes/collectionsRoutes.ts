import express from 'express';
import * as collectionController from '../controllers/collectionController';

const router = express.Router();

// Routes pour les collections
router.get('/', collectionController.getAllCollections);
router.get('/:id', collectionController.getCollectionById);
router.get('/slug/:slug', collectionController.getCollectionBySlug);
router.post('/', collectionController.createCollection);
router.put('/:id', collectionController.updateCollection);
router.delete('/:id', collectionController.deleteCollection);

export default router;
