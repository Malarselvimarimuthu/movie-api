import { Request, Response ,NextFunction} from 'express';
import Favorite from '../models/favourite.model';

// Add favorite
export const addFavourite = async (req: Request, res: Response): Promise<void> => {
  const { userId, movieId, title, poster_path, overview, release_date } = req.body;

  try {
    // Check if the favorite already exists for this user and movie
    const existingFavorite = await Favorite.findOne({ userId, movieId });
    if (existingFavorite) {
      res.status(400).json({ error: 'Movie is already in favorites' });
      return;
    }

    // If not, add it to the favorites
    const favorite = new Favorite({
      userId,
      movieId,
      title,
      poster_path,
      overview,
      release_date
    });
    await favorite.save();

    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
};

// Remove favorite
export const removeFavourite = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.userId as string;
    const movieId = req.query.movieId ? parseInt(req.query.movieId as string, 10) : NaN; // Convert movieId to number

    // Validate if userId and movieId are provided and valid
    if (!userId || isNaN(movieId)) {
      res.status(400).json({ error: 'Valid User ID and Movie ID are required' });
      return;
    }

    // Find and delete the favorite based on userId and movieId
    const result = await Favorite.findOneAndDelete({ userId, movieId });

    if (!result) {
      res.status(404).json({ message: 'Favorite not found' });
      return;
    }

    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error in removeFavourite:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};

// Get all favorites
export const getFavourites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.query; // Get userId from query parameters
        if (!userId) {
          res.status(400).json({ error: 'User ID is required' });
          return;
        }
    
        const favorites = await Favorite.find({ userId });
        if (favorites.length === 0) {
          res.status(404).json({ message: 'No favorites found for this user' });
          return;
        }
    
        res.json(favorites);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
      }
};
