"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoConfig_1 = require("./configs/mongoConfig");
const logger_1 = require("./utils/logger");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// app.use(session({ secret: 'yourSecret', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// Load environment variables from .env file
require('dotenv').config();
// Connect to MongoDB
(0, mongoConfig_1.connectToMongoDB)().catch(error => logger_1.Logger.error('MongoDB connection error:', error));
// Use user routes
app.use('/api/users', userRoutes_1.default);
// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger_1.Logger.info(`Server is running on port ${PORT}`);
});
