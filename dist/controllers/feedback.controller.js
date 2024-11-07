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
exports.fetchAllFeedback = exports.submitFeedback = void 0;
const feedback_models_1 = __importDefault(require("../models/feedback.models"));
const submitFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, username, movieId, command } = req.body;
    if (!userId || !username || !movieId || !command) {
        res.status(400).json({ message: 'UserId, username, movieId, and command are required.' });
        return;
    }
    try {
        const feedback = new feedback_models_1.default({
            userId,
            username,
            movieId,
            command,
        });
        // Save the feedback to the database
        yield feedback.save();
        res.status(200).json({ message: 'Feedback submitted successfully.' });
    }
    catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ message: 'Failed to submit feedback.' });
    }
});
exports.submitFeedback = submitFeedback;
// Fetch all feedback based on movieId
const fetchAllFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.query;
    if (!movieId) {
        res.status(400).json({ message: 'MovieId is required.' });
        return;
    }
    try {
        const feedbacks = yield feedback_models_1.default.find({ movieId });
        res.status(200).json(feedbacks);
    }
    catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Failed to fetch feedback.' });
    }
});
exports.fetchAllFeedback = fetchAllFeedback;
