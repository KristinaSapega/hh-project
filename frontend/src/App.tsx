import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline, createTheme } from '@mui/material';
import { ruRU } from '@mui/material/locale';

import AppLayout from './AppLayout';
import Header from './components/Header';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Stand from './pages/Stand';
import { routes } from './routes/routes';

const App = () => {
  // для смены темы. в палитре заданы свои основные цвета тем
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const lightPallete = {
    mode,
    primary: {
      main: '#FB3C1A',
      contrastText: '#EDEDED',
    },
    secondary: {
      main: '#9c27b0',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#F4F4F4',
    },
    text: {
      primary: '#4e4e4e',
      disabled: 'rgba(255,255,255,0.3)',
    },
    success: {
      main: '#58BC35',
    },
  };

  const darkPallete = {
    mode,
    primary: {
      main: '#FB3C1A',
    },
    secondary: {
      main: '#1C1C28',
      contrastText: '#ffffff',
    },
    background: {
      default: '#1C1C28',
      paper: '#252631',
    },
    text: {
      primary: 'rgba(255,255,255,0.7)',
      secondary: 'rgba(255, 255, 255, 0.5)',
      disabled: 'rgba(255,255,255,0.3)',
    },
    success: {
      main: '#58BC35',
    },
  };

  const theme = createTheme(
    {
      palette: mode === 'dark' ? darkPallete : lightPallete,
    },
    ruRU,
  );

  // функция для переключения темы, передаем пропсом в хедер
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          '*': {
            boxShadow: 'none!important',
            backgroundImage: 'none!important',
          },
          bgcolor: 'background.default',
          paddingTop: '85px',
          height: '100vh',
          width: '100vw',
          maxWidth: '1920px',
          margin: '0 auto',
          boxSizing: 'border-box',
          flexGrow: 1,
        }}
      >
        <BrowserRouter>
          <Header toggleTheme={toggleTheme} mode={mode} />
          <Routes>
            <Route path={routes.login} element={<Login />} />
            <Route
              path="*"
              element={
                <AppLayout>
                  <Routes>
                    <Route path={routes.main} element={<MainPage />} />
                    <Route path={routes.stand} element={<Stand />} />
                    <Route path="*" element={<></>} />
                  </Routes>
                </AppLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
