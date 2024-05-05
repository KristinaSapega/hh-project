import { FC } from 'react';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import { HistoryProps } from '../../types';
import StandsList from './Jobs/StandsList';

const History: FC<HistoryProps> = ({ isVisible, setIsVisible }) => {
  return (
    <Box>
      {isVisible ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              mb: 2,
            }}
          >
            <IconButton onClick={setIsVisible}>
              <ArrowRightOutlined />
            </IconButton>

            <StandsList />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={setIsVisible}>
            <ArrowLeftOutlined />
          </IconButton>

          <Typography
            sx={{
              padding: '5px',
              textOrientation: 'sideways',
              textAlign: 'center',
              writingMode: 'vertical-lr',
            }}
          >
            История
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default History;
