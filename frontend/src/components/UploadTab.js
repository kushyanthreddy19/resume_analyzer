import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useState } from 'react';
import AnalysisDisplay from './AnalysisDisplay';

function UploadTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setAnalysisData(null);
    setError('');
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysisData(null);

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const response = await fetch('http://localhost:3001/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const resClone = response.clone();
        let errorText;
        try {
          const errorData = await resClone.json();
          errorText = errorData.message || JSON.stringify(errorData);
        } catch (e) {
          errorText = await response.text();
        }
        throw new Error(errorText || `Server responded with status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setAnalysisData(data);
    } catch (err) {
      console.error('Analysis API call failed:', err);
      setError(err.message || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Analyze your resume</Typography>
        <Typography variant="body1" color="text.secondary">Get instant AI feedback, insights, and actionable improvements.</Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderStyle: 'dashed' }}>
        <Stack spacing={2} alignItems="center">
          <CloudUploadIcon color="primary" sx={{ fontSize: 48 }} />
          <Typography variant="subtitle1">Drag & drop your PDF here</Typography>
          <Typography variant="body2" color="text.secondary">or</Typography>
          <Button variant="contained" component="label">
            Choose PDF
            <input type="file" hidden accept=".pdf" onChange={handleFileChange} />
          </Button>
          {selectedFile && <Typography variant="body2">Selected: {selectedFile.name}</Typography>}
        </Stack>
      </Paper>

      <Box>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleAnalyze}
          disabled={!selectedFile || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Analyze Resume'}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}

      {analysisData && (
        <Box>
          <AnalysisDisplay data={analysisData} />
        </Box>
      )}
    </Stack>
  );
}

export default UploadTab;


