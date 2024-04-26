import { FunctionComponent } from 'react';

import { Box, Typography } from '@mui/material';

import LargeLogo from '../LargeLogo';

const StartWorkWindow: FunctionComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <LargeLogo />
      <Typography variant="h5" color="secondary" align="center">
        Для работы со стендом
        <br />
        выбери его во вкладке «Мои стенды»
      </Typography>
    </Box>
  );
};

export default StartWorkWindow;
