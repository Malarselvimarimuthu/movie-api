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
    console.log(req.body);
    try {
        const favorite = new favourite_model_1.default(req.body);
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
        const { userId, movieId } = req.query; // Get userId and movieId from query parameters
        // Validate if userId and movieId are provided
        if (!userId || !movieId) {
            return res.status(400).json({ error: 'User ID and Movie ID are required' });
        }
        const result = yield favourite_model_1.default.findOneAndDelete({ userId, movieId });
        if (!result) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        res.status(200).json({ message: 'Favorite removed' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});
exports.removeFavourite = removeFavourite;
// Get all favorites
const getFavourites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query; // Get userId from query parameters
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const favorites = yield favourite_model_1.default.find({ userId });
        if (favorites.length === 0) {
            return res.status(404).json({ message: 'No favorites found for this user' });
        }
        res.json(favorites);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});
exports.getFavourites = getFavourites;
