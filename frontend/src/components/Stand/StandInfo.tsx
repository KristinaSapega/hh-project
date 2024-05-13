import { FC } from 'react';

import { Box, useTheme } from '@mui/material';

import { useAppSelector } from '../../hooks/useAppSelector';
import { Stand } from '../../types';
import ElementStatus from '../ElementStatus';

const StandInfo: FC<{ id: number }> = ({ id }) => {
  const stand = useAppSelector((state) => state.stands.stands).find(
    (stand) => stand.id === id,
  ) as Stand;

  const theme = useTheme();

  return (
    <Box sx={{ mt: 2, pb: 2, display: 'flex', justifyContent: 'end' }}>
      {stand && (
        <Box sx={{ color: theme.palette.text.secondary, fontSize: 12 }}>
          {stand.host} {<ElementStatus status={stand.status} />}
        </Box>
      )}
    </Box>
  );
};

export default StandInfo;
