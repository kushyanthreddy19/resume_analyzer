import { Box, Chip, Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';

function AnalysisDisplay({ data }) {
  const { personalDetails, skills, aiFeedback } = data;

  return (
    <Paper elevation={3} sx={{ p: 3, textAlign: 'left' }}>
      <Typography variant="h4" gutterBottom>Analysis for {personalDetails?.name || 'N/A'}</Typography>
      
      <Box mb={3}>
        <Typography variant="h5" gutterBottom>AI Feedback (Rating: {aiFeedback?.rating || 'N/A'}/10)</Typography>
        <Typography variant="subtitle1">Summary:</Typography>
        <Typography paragraph>{aiFeedback?.summary}</Typography>
        <Typography variant="subtitle1">Improvements:</Typography>
        <List dense>
          {aiFeedback?.improvements?.map((item, i) => <ListItem key={i}><ListItemText primary={item} /></ListItem>)}
        </List>
        <Typography variant="subtitle1">Upskilling Suggestions:</Typography>
        <List dense>
          {aiFeedback?.upskilling?.map((item, i) => <ListItem key={i}><ListItemText primary={item} /></ListItem>)}
        </List>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Typography variant="h5" gutterBottom>Extracted Skills</Typography>
        <Typography variant="subtitle1">Technical Skills:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {skills?.technical?.map((skill) => <Chip key={skill} label={skill} color="primary" />)}
        </Box>
        <Typography variant="subtitle1">Soft Skills:</Typography>
         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {skills?.soft?.map((skill) => <Chip key={skill} label={skill} color="secondary" />)}
        </Box>
      </Box>
    </Paper>
  );
}

export default AnalysisDisplay;


