import mongoose from 'mongoose';
import { Logger } from '../utils/logger';

// Function to connect to MongoDB
export const connectToMongoDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    Logger.error('MongoDB URI is undefined. Check your .env file.');
    process.exit(1); // Stop the server if URI is missing
  }

  try {
    await mongoose.connect(mongoURI);
    Logger.info('MongoDB connected successfully');
  } catch (error) {
    Logger.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process on failure
  }
};
