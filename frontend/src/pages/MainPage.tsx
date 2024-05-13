import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

import EmptyOwnStands from '../components/Main/EmptyOwnStands';
import StartWorkWindow from '../components/Main/StartWorkWindow';
import { useAppSelector } from '../hooks/useAppSelector';
import { routes } from '../routes/routes';
import { RootState } from '../store';
import { Stand } from '../types';
import { useAuthContext } from '../hooks/useAuthContext';

const Main: FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  
  let login: string | null = null;
  if (user) {
    login = user.login;
  }

  const stands = useAppSelector((state: RootState) => state.stands.stands);
  const ownStands = stands.filter((stand: Stand) => stand.takenBy === login);

  useEffect(() => {
    if (!user) {
      navigate(routes.login);
    }
  }, [user, navigate]);

  return (
    <>
      <Box
        sx={{
          padding: '20px 20px',
          height: '100%',
        }}
      >
        {!ownStands.length ? <EmptyOwnStands /> : <StartWorkWindow />}
      </Box>
    </>
  );
};

export default Main;
