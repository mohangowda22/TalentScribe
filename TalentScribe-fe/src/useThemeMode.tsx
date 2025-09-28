import { useMemo } from 'react';
import { useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#22223b',
    },
    secondary: {
      main: '#4a4e69',
    },
    background: {
      default: mode === 'dark' ? '#181818' : '#f5f5f5',
      paper: mode === 'dark' ? '#232323' : '#fff',
    },
    text: {
      primary: mode === 'dark' ? '#f5f5f5' : '#22223b',
      secondary: mode === 'dark' ? '#aaa' : '#4a4e69',
    },
  },
});

export default function useThemeMode() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => createTheme(getThemeOptions(prefersDarkMode ? 'dark' : 'light')), [prefersDarkMode]);
  return theme;
}
