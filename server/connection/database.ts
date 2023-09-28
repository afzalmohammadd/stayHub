import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri: string | undefined = process.env.MONGO_URI;


const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error('MongoDB URI not found in .env file')
    }

    await mongoose.connect(uri);

    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
