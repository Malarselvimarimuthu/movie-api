import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel';

// Register function
const register = async (req: Request, res: Response)=> {
  const { name, email, password, phoneNumber, age } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      age,
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

// Login function
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
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

export default {
   register
};