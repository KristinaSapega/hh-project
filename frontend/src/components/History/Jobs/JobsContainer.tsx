import { FC } from 'react';

import { Box } from '@mui/material';

import Jobs from './Jobs';
import StandsList from './StandsList';

const JobsContainer: FC = () => {
  return (
    <Box
      sx={{
        margin: '0 10px',
      }}
    >
      <StandsList />
      <Jobs />
    </Box>
  );
};

export default JobsContainer;
