import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import resumeRoutes from './routes/resume.js';
import jobRoutes from './routes/job.js';
import { initSocket } from './socket.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/upload', resumeRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/talentscribe';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    initSocket(server);
  })
  .catch(err => console.error('MongoDB connection error:', err));
