// Import necessary modules
import express from 'express';
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'
import cors from 'cors'
import connectDB from './connection/database';

dotenv.config();

// Create an Express app
const app = express();

connectDB()

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors())
app.use(express.json());

// API routes 
app.use('/',userRoutes)
app.use('/admin',adminRoutes)

