import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setApplications } from '../store';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const ApplicationAutomation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(state => state.app.jobs);
  const resume = useAppSelector(state => state.app.resume);

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h5">Application Automation</Typography>
          <Button variant="contained" disabled={loading}>
            Automate Applications
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

// Application automation component removed
