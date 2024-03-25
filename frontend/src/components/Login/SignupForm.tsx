import { LockOutlined } from '@mui/icons-material';
import {
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { FormEvent, FunctionComponent } from 'react';

interface SignupFormProps {
  formSwitch: () => void;
}

const SignupForm: FunctionComponent<SignupFormProps> = ({ formSwitch }) => {
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
        Регистрация
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="login"
              name="login"
              required
              fullWidth
              id="login"
              label="Логин"
              autoFocus
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Пароль"
              name="password"
              autoComplete="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="passwordConfirm"
              label="Повторите пароль"
              type="passwordConfirm"
              id="passwordConfirm"
              autoComplete="passwordConfirm"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Зарегистрироваться
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography
              onClick={formSwitch}
              sx={{
                color: '#9a9a9a',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Зарегистрированы? Войти
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignupForm;
