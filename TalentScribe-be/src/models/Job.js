import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  url: String,
  skill: String,
  location: String,
  description: String,
  postedDate: Date,
  source: String,
});

export default mongoose.model('Job', JobSchema);
