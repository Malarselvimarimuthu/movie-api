import { Router } from 'express';
import authController from '../controllers/authController';
// import loginController from '../controllers/loginController';
import passport from 'passport';

const router = Router();

// Register route
router.post('/register', authController.register);

// Login route
// router.post('/login', loginController.login);

// Google sign-in route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

export default router;
