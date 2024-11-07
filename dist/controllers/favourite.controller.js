"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavourites = exports.removeFavourite = exports.addFavourite = void 0;
const favourite_model_1 = __importDefault(require("../models/favourite.model"));
// Add favorite
const addFavourite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, movieId, title, poster_path, overview, release_date } = req.body;
    try {
        // Check if the favorite already exists for this user and movie
        const existingFavorite = yield favourite_model_1.default.findOne({ userId, movieId });
        if (existingFavorite) {
            res.status(400).json({ error: 'Movie is already in favorites' });
            return;
        }
        // If not, add it to the favorites
        const favorite = new favourite_model_1.default({
            userId,
            movieId,
            title,
            poster_path,
            overview,
            release_date
        });
        yield favorite.save();
        res.status(201).json(favorite);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save favorite' });
    }
});
exports.addFavourite = addFavourite;
// Remove favorite
const removeFavourite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        const movieId = req.query.movieId ? parseInt(req.query.movieId, 10) : NaN; // Convert movieId to number
        // Validate if userId and movieId are provided and valid
        if (!userId || isNaN(movieId)) {
            res.status(400).json({ error: 'Valid User ID and Movie ID are required' });
            return;
        }
        // Find and delete the favorite based on userId and movieId
        const result = yield favourite_model_1.default.findOneAndDelete({ userId, movieId });
        if (!result) {
            res.status(404).json({ message: 'Favorite not found' });
            return;
        }
        res.status(200).json({ message: 'Favorite removed successfully' });
    }
    catch (error) {
        console.error('Error in removeFavourite:', error);
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});
exports.removeFavourite = removeFavourite;
// Get all favorites
const getFavourites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query; // Get userId from query parameters
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        const favorites = yield favourite_model_1.default.find({ userId });
        if (favorites.length === 0) {
            res.status(404).json({ message: 'No favorites found for this user' });
            return;
        }
        res.json(favorites);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});
exports.getFavourites = getFavourites;
