"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoConfig_1 = require("./configs/mongoConfig");
const logger_1 = require("./utils/logger");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, express_session_1.default)({ secret: 'yourSecret', resave: false, saveUninitialized: true }));
// Load environment variables from .env file
require('dotenv').config();
// Connect to MongoDB
(0, mongoConfig_1.connectToMongoDB)().catch(error => logger_1.Logger.error('MongoDB connection error:', error));
// Use user routes
app.use('/api/users', userRoutes_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger_1.Logger.info(`Server is running on port ${PORT}`);
});
