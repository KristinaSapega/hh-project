import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import StandInfo from '../components/Stand/StandInfo';
import StandTable from '../components/Stand/Table/StandTable';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addStandToTasks } from '../reducers/tasksReducer';

const Stand = () => {
  const params = useParams();
  const { id } = params;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addStandToTasks(Number(id)));
  }, [dispatch, id]);

  // TODO: если переходим на страницу стенда
  // с каким-то рандомным id вручную, пересылать на 404

  return (
    <Box>
      <StandInfo id={Number(id)} />
      <StandTable id={Number(id)} />
    </Box>
  );
};

export default Stand;
