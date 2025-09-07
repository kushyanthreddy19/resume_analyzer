import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#6C5CE7' : '#8E8DFF',
      },
      secondary: {
        main: mode === 'light' ? '#00B894' : '#55EFC4',
      },
      background: {
        default: mode === 'light' ? '#FAFAFF' : '#0B0C10',
        paper: mode === 'light' ? '#FFFFFF' : '#0F1117',
      },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      h4: { fontWeight: 800 },
      h5: { fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
      },
    },
  });


