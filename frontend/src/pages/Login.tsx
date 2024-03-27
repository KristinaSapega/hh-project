import { useState } from 'react';

import { Container } from '@mui/material';

import LoginForm from '../components/Login/LoginForm';
import SignupForm from '../components/Login/SignupForm';

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const formSwitch = () => {
    setIsLogin((prevState) => !prevState);
  };

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
