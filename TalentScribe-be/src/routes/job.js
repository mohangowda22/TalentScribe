import express from 'express';
import { searchJobs } from '../controllers/jobController.js';
const router = express.Router();

router.get('/', searchJobs);

export default router;
