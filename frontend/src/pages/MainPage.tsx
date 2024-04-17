import { FunctionComponent } from 'react';

import { Box } from '@mui/material';

import EmptyOwnStands from '../components/Main/EmptyOwnStands';

// import OwnStands from '../components/Main/OwnStands';

const Main: FunctionComponent = () => {
  // TODO запрашивать стенды здесь и сразу смотреть,
  // если ли занятые пользователем, в зависимости от этого показывать нужный компонент

  return (
    <Box
      sx={{
        padding: '20px 20px',
      }}
    >
      <EmptyOwnStands />
      {/* <OwnStands /> */}
    </Box>
  );
};

export default Main;
