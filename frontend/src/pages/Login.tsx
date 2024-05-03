import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';

import LoginForm from '../components/Login/LoginForm';
import SignupForm from '../components/Login/SignupForm';
import { useAuthContext } from '../hooks/useAuthContext';
import { routes } from '../routes/routes';

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const formSwitch = () => {
    setIsLogin((prevState) => !prevState);
  };

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(routes.main);
    }
  }, [user, navigate]);

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {isLogin ? (
        <LoginForm formSwitch={formSwitch} />
      ) : (
        <SignupForm formSwitch={formSwitch} />
      )}
    </Container>
  );
};

export default Login;
