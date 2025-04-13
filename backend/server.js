import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import formRoutes from './routes/formRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// MongoDB Connection
const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { 
  dbName: 'TrialDB',
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB Connection Failed:', err));

// API Routes
app.use('/api/form', formRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve index.html for all routes except /api/*
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  }
});

