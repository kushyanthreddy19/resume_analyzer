import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AppBar, Box, Container, CssBaseline, IconButton, Tab, Tabs, ThemeProvider, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import HistoryTab from './components/HistoryTab';
import UploadTab from './components/UploadTab';
import { getAppTheme } from './theme';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        background: theme.palette.mode === 'light'
          ? 'radial-gradient(1000px 400px at -10% -20%, #EDEBFF 0%, rgba(237,235,255,0) 60%), radial-gradient(1000px 400px at 110% 120%, #E9FBF5 0%, rgba(233,251,245,0) 60%)'
          : 'radial-gradient(1000px 400px at -10% -20%, #15192D 0%, rgba(21,25,45,0) 60%), radial-gradient(1000px 400px at 110% 120%, #102A27 0%, rgba(16,42,39,0) 60%)',
        pb: 6,
      }}>
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)', py: 1 }}>
          <Toolbar sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, flexGrow: 1 }}>
              📄 Resume Analyzer
            </Typography>
            <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              <IconButton color="inherit" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
          <Container>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Live Analysis" />
              <Tab label="History" />
            </Tabs>
          </Container>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <TabPanel value={value} index={0}>
            <UploadTab />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HistoryTab />
          </TabPanel>
        </Container>
        <Box component="footer" sx={{ textAlign: 'center', mt: 6, color: 'text.secondary' }}>
          <Typography variant="body2">Built with ❤️ to help you land your next role</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;