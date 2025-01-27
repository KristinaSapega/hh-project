import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline, createTheme } from '@mui/material';
import { ruRU } from '@mui/material/locale';

import AppLayout from './components/AppLayout/AppLayout';
import Header from './components/Header';
import Plugins from './components/LeftBar/Plugins/Plugins';
import Notification from './components/Notification';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Stand from './pages/Stand';
import { routes } from './routes/routes';
import { apiGetPlugins } from './store/plugins';
import { apiGetStands } from './store/stands';
import { darkPalette, lightPalette } from './utils/palette';

const App = () => {
  // для смены темы. в палитре заданы свои основные цвета тем
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const theme = createTheme(
    {
      palette: mode === 'dark' ? darkPalette : lightPalette,
    },
    ruRU,
  );

  // для возможности доступа к данным при загрузке приложения с любой страницы
  //const plugins = useAppSelector(state => state.plugins.plugins);
  const dispatch = useAppDispatch();

  const { user } = useAuthContext();

  useEffect(() => {
    // чтобы не делать запросов, когда пользователь не авторизован
    if (user) {
      dispatch(apiGetStands(user.header));
      dispatch(apiGetPlugins(user.header));
    }
  }, [dispatch, user]);

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
                    <Route path={routes.plugin} element={<Plugins />} />
                    <Route path="*" element={<></>} />
                  </Routes>
                </AppLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </Box>
      <Notification mode={mode} />
    </ThemeProvider>
  );
};

export default App;
