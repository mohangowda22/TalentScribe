import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setStatus } from '../store';
import { Card, CardContent, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';

const StatusTracking: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.app.status);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/status');
      if (res.ok) {
        const data = await res.json();
        dispatch(setStatus(data.status));
      } else {
        alert('Failed to fetch status.');
      }
    } catch (err) {
      alert('Error fetching status.');
    }
    setLoading(false);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Status Tracking</Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          <Button variant="contained" color="primary" onClick={fetchStatus} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh Status'}
          </Button>
        </Box>
        <List>
          {status.map((item: any, idx: number) => (
            <ListItem key={idx} divider>
              <ListItemText primary={item.jobTitle} secondary={item.state} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default StatusTracking;
