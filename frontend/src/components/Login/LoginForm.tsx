import { ValidationErrors } from 'final-form';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { useAuthContext } from '../../hooks/useAuthContext';
import { routes } from '../../routes/routes';
import { FormProps, LoginFormValues } from '../../types';

const LoginForm: FunctionComponent<FormProps> = ({ formSwitch }) => {
  const [formData, setFormData] = useState<{ login: string; password: string }>(
    { login: '', password: '' },
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { user, login } = useAuthContext();
  const navigate = useNavigate();

  const validate = async (): Promise<ValidationErrors | undefined> => {
    // нативная функция конвертации в base64 не поддерживает кириллицу
    const isCyrillic = (str: string): boolean => {
      return /[а-яА-Я]/g.test(str);
    };

    const errors: LoginFormValues = {};

    if (formData.login === '') {
      errors.login = 'Поле не должно быть пустым';
    } else if (isCyrillic(formData.login)) {
      errors.login = 'Поле не должно содержать кириллицы';
    }

    if (formData.password === '') {
      errors.password = 'Поле не должно быть пустым';
    } else if (isCyrillic(formData.password)) {
      errors.password = 'Поле не должно содержать кириллицы';
    }

    return Object.keys(errors).length > 0 ? errors : undefined;
  };

  const handleSubmit = () => {
    try {
      const convertUserData = btoa(`${formData.login}:${formData.password}`);
      login(formData.login, convertUserData);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(routes.main);
    }
  }, [user, navigate]);

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
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
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Field name="login">
              {({ input, meta }) => (
                <TextField
                  {...input}
                  onChange={handleChange}
                  value={formData.login}
                  margin="normal"
                  error={!!meta.error && meta.touched}
                  required
                  fullWidth
                  id="login"
                  label={meta.error && meta.touched ? meta.error : 'Логин'}
                  autoComplete="login"
                  autoFocus
                />
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <TextField
                  {...input}
                  onChange={handleChange}
                  value={formData.password}
                  margin="normal"
                  error={!!meta.error && meta.touched}
                  required
                  fullWidth
                  name="password"
                  label={meta.error && meta.touched ? meta.error : 'Пароль'}
                  type="password"
                  autoComplete="current-password"
                />
              )}
            </Field>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            <Grid container justifyContent="flex-end">
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
      )}
    />
  );
};

export default LoginForm;
