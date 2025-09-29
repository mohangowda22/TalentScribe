import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  coverLetter: String,
  status: { type: String, default: 'pending' },
  appliedDate: { type: Date, default: Date.now },
});

// Application model removed
