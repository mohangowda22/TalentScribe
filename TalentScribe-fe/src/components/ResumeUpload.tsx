import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { setResume } from '../store';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';

const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    try {
  const res = await fetch('http://localhost:5050/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        dispatch(setResume(file));
        alert('Resume uploaded successfully!');
      } else {
        alert('Upload failed.');
      }
    } catch (err) {
      alert('Error uploading resume.');
    }
    setLoading(false);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Resume Upload</Typography>
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          <Button
            variant="contained"
            component="label"
            color="primary"
            sx={{ width: '100%' }}
            disabled={loading}
          >
            {file ? file.name : 'Choose Resume'}
            <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file || loading} sx={{ width: '100%' }}>
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
