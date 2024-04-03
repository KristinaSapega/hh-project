import { ChangeEvent, FormEvent, FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Avatar, Typography, TextField, Button, Grid } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import { useAuthContext } from '../../hooks/useAuthContext';

import { routes } from '../../routes/routes';

interface LoginFormProps {
  formSwitch: () => void;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ formSwitch }) => {
  const [formData, setFormData] = useState<{ login: string, password: string }>({ login: '', password: '' });
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const {value, name } = event.target;
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { user, login } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login('BASE64CONVERTEDSTRING');
  };

  useEffect(() => {
    if (user) {
      navigate(routes.main);
    }
  }, [user, navigate]);
  return (
    <Box
      sx={{
        maxWidth: '500px',
        border: '1px solid #9a9a9a',
        borderRadius: '20px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Вход
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Логин"
          name="login"
          autoComplete="login"
          autoFocus
          value={formData.login}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
        <Grid container justifyContent='flex-end'>
          <Typography
            onClick={formSwitch}
            sx={{
              color: '#9a9a9a',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Зарегистрироваться?
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginForm;
