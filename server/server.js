import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

// Load environment variables from .env file (if present)
dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize Database Connection and start HTTP server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 CP Task Manager Backend running on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📋 API Endpoints: http://localhost:${PORT}/api/problems`);
  });
};

startServer();
