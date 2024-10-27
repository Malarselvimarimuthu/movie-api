import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('Invalid email or password');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid email or password');
      }
  
      // Here you could also add a token generation for authentication
      res.status(200).send('Login successful');
    } catch (error) {
      res.status(500).send('Error logging in user');
    }
  };

export default login ;