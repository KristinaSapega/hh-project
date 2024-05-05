import { FC, useState } from 'react';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { Box, IconButton, SelectChangeEvent, Typography } from '@mui/material';

import { HistoryProps } from '../../types';
import StandsList from './Jobs/StandsList';
import Jobs from './Jobs/Jobs';

const History: FC<HistoryProps> = ({ isVisible, setIsVisible }) => {
  const [selectedStand, setSelectedStand] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStand(event.target.value);
  };

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

            <StandsList selectedStand={selectedStand} handleChange={handleChange} />
          </Box>

          {selectedStand && <Jobs selectedStand={selectedStand} />}
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
