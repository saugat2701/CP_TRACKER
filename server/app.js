import express from "express";
import cors from "cors";
import problemRoutes from "./routes/problemRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import revisionRoutes from "./routes/revisionRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import { isDbConnected } from "./config/db.js";

const app = express();

// Allowed origins for CORS (Vite development and preview servers)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for local college development
      }
    },
    credentials: true,
  })
);

// Express JSON body parser
app.use(express.json());

// API Health Check & Database Status
app.get("/api/health", (req, res) => {
  const dbStatus = isDbConnected();
  res.status(200).json({
    success: true,
    status: "online",
    database: dbStatus ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Manual database reconnection trigger
app.post("/api/health/reconnect", async (req, res) => {
  const { connectDB } = await import("./config/db.js");
  const conn = await connectDB();
  const dbStatus = isDbConnected();
  res.status(dbStatus ? 200 : 503).json({
    success: dbStatus,
    database: dbStatus ? "connected" : "disconnected",
    host: conn?.connection?.host || null,
  });
});

// API Routes Mount
app.use("/api/problems", problemRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/revisions", revisionRoutes);

// Catch 404 and forward to error handler
app.use(notFoundHandler);

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
