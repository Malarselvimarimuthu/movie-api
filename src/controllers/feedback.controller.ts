import { Request, Response } from 'express';
import Feedback from '../models/feedback.models';

export const submitFeedback = async (req: Request, res: Response): Promise<void> => {
  const { userId, username, movieId, command } = req.body;

  if (!userId || !username || !movieId || !command) {
    res.status(400).json({ message: 'UserId, username, movieId, and command are required.' });
    return;
  }

  try {
    const feedback = new Feedback({
      userId,
      username,
      movieId,
      command,
    });

    // Save the feedback to the database
    await feedback.save();

    res.status(200).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Failed to submit feedback.' });
  }
};

// Fetch all feedback based on movieId
export const fetchAllFeedback = async (req: Request, res: Response): Promise<void> => {
  const { movieId } = req.query;

  if (!movieId) {
    res.status(400).json({ message: 'MovieId is required.' });
    return;
  }

  try {
    const feedbacks = await Feedback.find({ movieId });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Failed to fetch feedback.' });
  }
};
