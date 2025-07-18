import { pool } from '../config/postgres';
import { IUser } from '../models/User';

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

interface UpdateUser {
  name: string;
  email: string;
}

export const createUser = async (user: CreateUser): Promise<IUser> => {
  try {
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [user.name, user.email, user.password];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch {
    throw new Error('Error creating user');
  }
};

export const getUserById = async (id: string): Promise<IUser> => {
  try {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch {
    throw new Error('Error fetching user');
  }
};

export const getUserByEmail = async (email: string): Promise<IUser> => {
  try {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch {
    throw new Error('Error fetching user');
  }
};

export const updateUser = async (id: string, user: UpdateUser): Promise<IUser> => {
  try {
    const query = `UPDATE users SET name = $1, email = $2 WHERE id = $3`;
    const values = [user.name, user.email, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch {
    throw new Error('Error updating user');
  }
};

export const deleteUser = async (id: string): Promise<IUser> => {
  try {
    const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch {
    throw new Error('Error deleting user');
  }
};
