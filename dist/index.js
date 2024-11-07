"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoConfig_1 = require("./configs/mongoConfig");
const logger_1 = require("./utils/logger");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const favouriteRoutes_1 = __importDefault(require("./routes/favouriteRoutes"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Load environment variables from .env file
require('dotenv').config();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE'
}));
// Connect to MongoDB
(0, mongoConfig_1.connectToMongoDB)().catch(error => logger_1.Logger.error('MongoDB connection error:', error));
// Use user routes
app.use('/api/users', userRoutes_1.default);
// Favourites Routes
app.use('/api', favouriteRoutes_1.default);
app.use('/api/feedback', feedbackRoutes_1.default);
// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger_1.Logger.info(`Server is running on port ${PORT}`);
});
