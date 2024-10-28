import { Request, Response } from 'express';
import User from '../models/user.model';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import bcryptConfig from '../configs/bycrypt';

const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid credentials');
      }
  
      res.send('User logged in successfully');
    } catch (error) {
      res.status(500).send('Error logging in user');
    }
  };


const register = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'User registration failed', error: error.message });
    }
  };



export default {
    login,
    register
};
