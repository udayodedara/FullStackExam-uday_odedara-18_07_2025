import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import connectMongoDB from './config/mongodb';
import { connectPostgres } from './config/postgres';
import routes from './routes';
import { config } from './config/config';
import path from 'path';

const app: Express = express();
const port = config.port;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes
app.use('/api', routes);

// Basic route
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to Express TypeScript Server' });
});

// Connect to databases
const startServer = async (): Promise<void> => {
  try {
    await connectMongoDB();
    await connectPostgres();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
