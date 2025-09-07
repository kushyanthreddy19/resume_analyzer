import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Grid, Modal, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AnalysisDisplay from './AnalysisDisplay';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function HistoryTab() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedResume, setSelectedResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/resumes');
        setHistory(response.data);
      } catch (err) {
        setError('Failed to fetch history.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleOpenModal = (resume) => {
    setSelectedResume(resume.analysisData);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => setIsModalOpen(false);

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  if (history.length === 0) {
    return (
      <Paper sx={{ p: 6, textAlign: 'center' }}>
        <Typography variant="h6">No history yet</Typography>
        <Typography color="text.secondary">Upload a resume in the Live Analysis tab to see recent analyses here.</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {history.map((row) => (
          <Grid item xs={12} sm={6} md={4} key={row.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>{row.analysisData.personalDetails.name}</Typography>
                <Typography variant="body2" color="text.secondary">{row.analysisData.personalDetails.email}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{row.fileName}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleOpenModal(row)}>View details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          {selectedResume && <AnalysisDisplay data={selectedResume} />}
        </Box>
      </Modal>
    </>
  );
}

export default HistoryTab;


