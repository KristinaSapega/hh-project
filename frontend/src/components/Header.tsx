import { FunctionComponent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  Brightness4Outlined,
  Brightness7Outlined,
  PersonOutlineOutlined,
} from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { routes } from '../routes/routes';
import { HeaderProps } from '../types';

const Header: FunctionComponent<HeaderProps> = ({ toggleTheme, mode }) => {
  // Состояние для открытия меню пользователя
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Для разного поведения хедера в зависимости от того,
  // на какой странице находимся
  const location = useLocation();
  const pathname = location.pathname;

  // для перехода на другие страницы по клику на пункт меню
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Container maxWidth={false} sx={{ maxWidth: '1920px' }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box flexGrow={0} display={'flex'}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  mr: 2,
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                }}
              >
                <Link
                  to={routes.main}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  CRAB
                </Link>
              </Typography>
            </Box>
          </Box>

          <Box display="flex" flexGrow={0} alignItems="center">
            <Box sx={{ flexGrow: 0, m: '0 20px', mr: 0 }}>
              <Tooltip title="Switch theme">
                <IconButton sx={{ ml: 1 }} onClick={toggleTheme}>
                  {mode === 'dark' ? (
                    <Brightness7Outlined />
                  ) : (
                    <Brightness4Outlined />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            {pathname === '/' ? (
              <Box sx={{ flexGrow: 0, ml: '20px' }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <PersonOutlineOutlined />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="profile" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={() => {}}>
                      Profile
                    </Typography>
                  </MenuItem>

                  <MenuItem key="logout" onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate(routes.login)}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
