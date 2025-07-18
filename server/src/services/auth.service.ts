import { IUser } from '../models/User';
import { createCart } from './cart.service';
import { createUser, getUserByEmail } from './user.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (user: CreateUser): Promise<IUser> => {
  try {
    const existingUser = await getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await createUser({ ...user, password: hashedPassword });
    await createCart(newUser.id);
    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error registering user');
    }
  }
};

export const loginUser = async (email: string, password: string): Promise<string> => {
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      config.jwt.secret as string,
      {
        expiresIn: '1h',
      }
    );

    return token;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error logging in user');
    }
  }
};
