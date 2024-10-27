"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import authController from '../controllers/auth.controller';
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
// Register route
router.post('/register', auth_controller_1.default.register);
router.post('/login', auth_controller_1.default.login);
exports.default = router;
