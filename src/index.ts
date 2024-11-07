import express , {Express} from 'express';
import { connectToMongoDB } from './configs/mongoConfig';
import { Logger } from './utils/logger';
import userRoutes from './routes/userRoutes';
import favouriteRoutes from './routes/favouriteRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import cors from 'cors';
import { Request, Response } from 'express';
const app: Express = express();

// Load environment variables from .env file
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors({
   origin: 'http://localhost:3000',
   methods: 'GET,POST,PUT,DELETE'
}));



// Connect to MongoDB
connectToMongoDB().catch(error => Logger.error('MongoDB connection error:', error));

// Use user routes
app.use('/api/users', userRoutes);

// Favourites Routes
app.use('/api', favouriteRoutes);
app.use('/api/feedback', feedbackRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}`);
});
