import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import formRoutes from './routes/formRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// MongoDB Connection
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { dbName: 'TrialDB' })
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB Connection Failed:', err));

// Routes
app.use('/api/form', formRoutes);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

