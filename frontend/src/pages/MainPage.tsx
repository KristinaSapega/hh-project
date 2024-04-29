import { FC } from 'react';
import { Box } from '@mui/material';
import EmptyOwnStands from '../components/Main/EmptyOwnStands';
import StartWorkWindow from '../components/Main/StartWorkWindow';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAuthContext } from '../hooks/useAuthContext';
import { RootState } from '../store';
import { Stand } from '../types';


const Main: FC = () => {
  // TODO запрашивать стенды здесь и сразу смотреть,
  // если ли занятые пользователем, в зависимости от этого показывать нужный компонент
  const { user } = useAuthContext();

  const stands = useAppSelector((state: RootState) => state.stands.stands);
  const ownStands = stands.filter(
    (stand: Stand) => stand.takenBy === atob(user || '').split(':')[0],
  );

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
