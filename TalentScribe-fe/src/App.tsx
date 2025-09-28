import './App.css';
import { ResumeUpload, JobSearch, ApplicationAutomation, StatusTracking } from './components';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight={700}>
        Talent Scribe
      </Typography>
      <div className="main-ui">
        <ResumeUpload />
        <JobSearch />
        <ApplicationAutomation />
        <StatusTracking />
      </div>
    </Container>
  );
}

export default App;
