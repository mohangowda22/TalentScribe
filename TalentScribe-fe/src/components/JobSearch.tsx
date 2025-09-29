import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setJobs } from '../store';
import { Card, CardContent, Typography, Button, Box, TextField, List, ListItem, ListItemText } from '@mui/material';

const JobSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(state => state.app.jobs);

  useEffect(() => {
    const socket = io('http://localhost:5050');
    socket.on('jobsUpdated', (jobs: any[]) => {
      dispatch(setJobs(jobs));
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5050/api/jobs?search=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        dispatch(setJobs(data.jobs));
      } else {
        alert('Job search failed.');
      }
    } catch (err) {
      alert('Error searching jobs.');
    }
    setLoading(false);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Job Search</Typography>
        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <TextField
            type="text"
            label="Search jobs"
            variant="outlined"
            value={query}
            onChange={e => setQuery(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Box>
        <List>
          {jobs.map((job: any, idx: number) => (
            <ListItem key={idx} divider>
              <ListItemText primary={job.title} secondary={job.company} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default JobSearch;
