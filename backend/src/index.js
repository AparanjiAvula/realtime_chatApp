import express, { json, static as serveStatic } from 'express';
import authRoutes from './routes/auth.route.js';
import { config } from 'dotenv';
import dbConnect from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import { app, server } from "./lib/socket.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

config();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(serveStatic(join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
  dbConnect();
});
