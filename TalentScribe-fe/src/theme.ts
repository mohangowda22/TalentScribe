import { createTheme } from '@mui/material/styles';

// Monochrome or 3-color palette example
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#22223b', // dark blue-gray
    },
    secondary: {
      main: '#4a4e69', // muted purple
    },
    background: {
  default: '#f5f5f5', // light gray
      paper: '#fff',
    },
    text: {
      primary: '#22223b',
      secondary: '#4a4e69',
    },
  },
});

export default theme;
