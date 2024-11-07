import express, { Request, Response } from 'express';
import { submitFeedback , fetchAllFeedback } from '../controllers/feedback.controller';

const router = express.Router();

// POST route for submitting feedback
router.post('/submit', submitFeedback);
router.get('/getfeedback', fetchAllFeedback);

export default router;
