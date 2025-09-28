import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setApplications } from '../store';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const ApplicationAutomation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(state => state.app.jobs);
  const resume = useAppSelector(state => state.app.resume);

  const handleAutomate = async () => {
    if (!resume || jobs.length === 0) {
      alert('Upload resume and search jobs first.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobs, resumeName: resume.name }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(setApplications(data.applications));
        alert('Applications automated!');
      } else {
        alert('Automation failed.');
      }
    } catch (err) {
      alert('Error automating applications.');
    }
    setLoading(false);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Application Automation</Typography>
        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleAutomate} disabled={loading}>
            {loading ? 'Automating...' : 'Automate Applications'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ApplicationAutomation;
