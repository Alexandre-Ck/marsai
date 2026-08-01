import { Router } from 'express';
import ratingController from '../controllers/rating.controller.js'; // 🌟 Import de l'objet par défaut
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// On utilise l'objet "ratingController" pour appeler tes méthodes
router.post('/', authenticate, ratingController.createRating);
router.get('/:movieId', authenticate, ratingController.getRating);
router.delete('/:movieId', authenticate, ratingController.deleteRating);

export default router;