import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import * as cartService from '../services/cart.service';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password } = req.body;
    const user = await userService.createUser({ email, name, password });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name } = req.body;
    const user = await userService.updateUser(req.params.id, { email, name });
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    await cartService.deleteCart(user.id);
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ message: 'User fetched successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error });
  }
};

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    res.status(200).json({ message: 'User fetched successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error });
  }
};
