import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';

import EmptyOwnStands from '../components/Main/EmptyOwnStands';
import { useAuthContext } from '../hooks/useAuthContext';
import { RootState } from '../store';
import StartWorkWindow from '../components/Main/StartWorkWindow';

const Main: FunctionComponent = () => {
  // TODO запрашивать стенды здесь и сразу смотреть,
  // если ли занятые пользователем, в зависимости от этого показывать нужный компонент
  const { user } = useAuthContext();

  // получаем из стора стенды и здесь же фильтруем, чтобы выбрать занятые пользователем
  // нужно для условной отрисовки
  const stands = useSelector((state: RootState) => state.stands.stands);
  const ownStands = stands.filter(
    (stand) => stand.takenBy === atob(user || '').split(':')[0],
  );

  return (
    <Box
      sx={{
        padding: '20px 20px',
        height: '100%',
      }}
    >
      {!ownStands.length ? <EmptyOwnStands /> : <StartWorkWindow />}
    </Box>
  );
};

export default Main;
