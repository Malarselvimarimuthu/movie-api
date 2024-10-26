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
exports.connectToMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
// Function to connect to MongoDB
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        logger_1.Logger.error('MongoDB URI is undefined. Check your .env file.');
        process.exit(1); // Stop the server if URI is missing
    }
    try {
        yield mongoose_1.default.connect(mongoURI);
        logger_1.Logger.info('MongoDB connected successfully');
    }
    catch (error) {
        logger_1.Logger.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process on failure
    }
});
exports.connectToMongoDB = connectToMongoDB;
