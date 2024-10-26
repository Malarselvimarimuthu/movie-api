import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
import passport from 'passport';

// Login function
const login = async (req: Request, res: Response, next: any) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      req.login(user, (err) => {
        if (err) {
          return next(err); // Pass error to next middleware
        }
        return res.json({ message: 'User logged in successfully' });
      });
    } catch (error) {
      next(error); // Properly pass async errors to Express error handler
    }
  };
  