import express from 'express';
import { addFavourite, removeFavourite, getFavourites } from '../controllers/favourite.controller';

const router = express.Router();

router.post('/favourites', addFavourite);
router.delete('/favourites', removeFavourite);
router.get('/favourites', getFavourites);

export default router;
