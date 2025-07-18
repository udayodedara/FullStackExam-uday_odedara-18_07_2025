import mongoose from 'mongoose';
import { config } from './config';

const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoURI = config.db.mongoURI as string;
    await mongoose.connect(mongoURI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectMongoDB;
