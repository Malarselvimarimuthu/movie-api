import { Router } from 'express';
// import authController from '../controllers/auth.controller';
import authController from '../controllers/auth.controller';

const router = Router();

// Register route
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
