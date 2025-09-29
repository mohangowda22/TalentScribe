import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  uploadDate: { type: Date, default: Date.now },
  parsedData: Object,
});

export default mongoose.model('Resume', ResumeSchema);
