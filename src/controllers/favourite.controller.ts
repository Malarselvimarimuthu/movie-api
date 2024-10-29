import { Request, Response } from 'express';
import Favorite from '../models/favourite.model';

// Add favorite
export const addFavourite = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const favorite = new Favorite(req.body);
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
};

// Remove favorite
export const removeFavourite = async (req: Request, res: Response) => {
    try {
      const { userId, movieId } = req.query; // Get userId and movieId from query parameters
  
      // Validate if userId and movieId are provided
      if (!userId || !movieId) {
        return res.status(400).json({ error: 'User ID and Movie ID are required' });
      }
  
      const result = await Favorite.findOneAndDelete({ userId, movieId });
  
      if (!result) {
        return res.status(404).json({ message: 'Favorite not found' });
      }
  
      res.status(200).json({ message: 'Favorite removed' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove favorite' });
    }
  };

// Get all favorites
export const getFavourites = async (req: Request, res: Response) => {
    try {
        const { userId } = req.query; // Get userId from query parameters
        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }
    
        const favorites = await Favorite.find({ userId });
        if (favorites.length === 0) {
          return res.status(404).json({ message: 'No favorites found for this user' });
        }
    
        res.json(favorites);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
      }
};
