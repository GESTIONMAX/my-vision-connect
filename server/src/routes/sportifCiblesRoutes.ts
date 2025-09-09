import express from 'express';
import * as sportifCibleController from '../controllers/sportifCibleController';

const router = express.Router();

// Routes pour les sportifs cibles
router.get('/', sportifCibleController.getAllSportifCibles);
router.get('/:id', sportifCibleController.getSportifCibleById);
router.get('/nom/:nom', sportifCibleController.getSportifCibleByNom);
router.post('/', sportifCibleController.createSportifCible);
router.put('/:id', sportifCibleController.updateSportifCible);
router.delete('/:id', sportifCibleController.deleteSportifCible);

export default router;
