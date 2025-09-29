import Job from '../models/Job.js';

export const searchJobs = async (req, res) => {
  try {
    const { search } = req.query;
    console.log('[INFO] Job search request:', search);
    // TODO: Integrate with job sources or scraping
    const jobs = await Job.find(search ? { title: { $regex: search, $options: 'i' } } : {});
    console.log('[DEBUG] Jobs found:', jobs.length);
    res.json({ jobs });
  } catch (err) {
    console.error('[ERROR] Job search failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};
