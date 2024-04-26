import { useSelector } from 'react-redux';
import { FC, useEffect } from 'react';

import { Box } from '@mui/material';

import EmptyOwnStands from '../components/Main/EmptyOwnStands';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAuthContext } from '../hooks/useAuthContext';
import { apiGetStands, apiLeaveStand, apiTakeStand } from '../store/stands';

const Main: FC = () => {
  
  // TODO запрашивать стенды здесь и сразу смотреть,
  // если ли занятые пользователем, в зависимости от этого показывать нужный компонент
  const { user } = useAuthContext();

  const stands = useAppSelector(state => state.stands.stands);
  const ownStands = stands.filter(
    (stand) => stand.takenBy === atob(user || '').split(':')[0],
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(apiGetStands())
  }, [dispatch]);

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
