import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, Box } from '@mui/material';

import Header from './components/Header';
import Login from './pages/Login';

import { routes } from './routes/routes';

const App = () => {
  // для смены темы. в палитре заданы свои основные цвета тем
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#9a9a9a',
      },
      secondary: {
        main: '#9a9a9a',
      },
    },
  });

  // функция для переключения темы, передаем пропсом в хедер
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box
          sx={{
            bgcolor: 'background.default',
            paddingTop: '80px',
            height: '100vh',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          <Header toggleTheme={toggleTheme} mode={mode} />
          <Routes>
            <Route path={routes.main} element={<></>} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.stand} element={<></>} />
            <Route path="*" element={<></>} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
