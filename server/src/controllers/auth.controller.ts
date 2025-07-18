import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await authService.registerUser(req.body);
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    res.status(201).json({ message: 'User registered successfully', user: safeUser });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Error registering user',
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await authService.loginUser(req.body.email, req.body.password);
    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    res
      .status(400)
      .json({ message: error instanceof Error ? error.message : 'Error logging in user' });
  }
};
