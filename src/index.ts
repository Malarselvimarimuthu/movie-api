import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { connectToMongoDB } from './configs/mongoConfig';
import { Logger } from './utils/logger';
import userRoutes from './routes/userRoutes';
import './config/auth'; 

const app = express();

// Middleware
app.use(express.json());
app.use(session({ secret: 'yourSecret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
connectToMongoDB().catch(error => Logger.error('MongoDB connection error:', error));

// Use user routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}`);
});
