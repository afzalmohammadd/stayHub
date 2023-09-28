// Import necessary modules
import express from 'express';
import dotenv from "dotenv";
import connectDB from './connection/database';

dotenv.config();

// Create an Express app
const app = express();



// Define API routes here

connectDB()

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
