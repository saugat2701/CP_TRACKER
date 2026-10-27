import mongoose from "mongoose";

let isConnected = false;

/**
 * Connect to MongoDB database
 * Reads connection string from environment variables or falls back to local instance.
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cp_task_manager";

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn(
      `⚠️ Tip: Ensure MongoDB is running locally (e.g. 'net start MongoDB') or set MONGODB_URI in server/.env with your MongoDB Atlas connection string.`
    );
    // Don't kill process immediately so server can report DB status via API
    return null;
  }
};

/**
 * Returns current database connection state
 */
export const isDbConnected = () => isConnected && mongoose.connection.readyState === 1;
