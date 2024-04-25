import { FC, useEffect } from 'react';

import { Box } from '@mui/material';

import EmptyOwnStands from '../components/Main/EmptyOwnStands';
//import { AppDispatch, RootState } from '../store';
//import { connect } from 'react-redux';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { apiGetStands, apiLeaveStand, apiTakeStand } from '../store/stands';


// import OwnStands from '../components/Main/OwnStands';

const Main: FC = () => {
  
  // TODO запрашивать стенды здесь и сразу смотреть,
  // если ли занятые пользователем, в зависимости от этого показывать нужный компонент
  const stands = useAppSelector(state => state.stands.stands);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(apiGetStands())
  }, [dispatch]);

  return (
    <Box
      sx={{
        padding: '20px 20px',
      }}
    >
      {stands.map(stand => (
        <div key={stand.id}>
          {JSON.stringify(stand)}
          <button onClick={() => dispatch(apiTakeStand(stand.id))}>Занять</button>
          <button onClick={() => dispatch(apiLeaveStand(stand.id))}>Освободить</button>
        </div>
      ))}
      <EmptyOwnStands />
      {/* <OwnStands /> */}
    </Box>
  );
};

// const mapState = (state: RootState) => ({

// })
// const mapDispatch = (dispatch: AppDispatch) => ({

// })
// const connector = connect(mapState, mapDispatch);

// type Props = typeconnector

export default Main;
