import { LockOutlined } from '@mui/icons-material';
import { Box, Avatar, Typography, TextField, Button, Grid } from '@mui/material';
import { FormEvent, FunctionComponent } from 'react';

interface LoginFormProps {
  formSwitch: () => void;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ formSwitch }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
