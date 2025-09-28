import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import useThemeMode from './useThemeMode';



function Main() {
  const theme = useThemeMode();
  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Main />);
