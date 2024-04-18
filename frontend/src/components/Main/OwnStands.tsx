// TODO если есть занятые стенды, рисуем таблицу с ними вместо пустого экрана с кнопкой
import { FunctionComponent, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import StandsModal from '../StandsModal';

const OwnStands: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <Typography variant={'h5'}>Пока занятых стендов нет</Typography>
      <hr style={{ marginBottom: '20px', height: '1px' }} />

      <Button onClick={() => setOpen(true)} variant="contained" color="success">
        Подключиться...
      </Button>

      <StandsModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default OwnStands;
