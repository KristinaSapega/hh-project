import { FunctionComponent, ReactNode, useState } from 'react';

import { Box, Paper, Typography } from '@mui/material';

import LeftBar from './components/LeftBar/LeftBar';
import Logs from './components/Logs/Logs';

const AppLayout: FunctionComponent<{ children?: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: 'grid',
        height: 'calc(100vh - 85px)',
        gap: '20px',
        margin: '0 20px',
        gridTemplateColumns: '15fr 50fr 40px',
        gridTemplateRows: isVisible ? 'auto 300px' : 'auto 40px',
        gridTemplateAreas: `
"left content right"
"logs logs logs"
`,
      }}
    >
      <Box
        sx={{
          gridArea: 'left',
          overflow: 'auto',
          scrollbarWidth: 'none',
          '&::webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <LeftBar />
      </Box>

      <Paper
        sx={{
          gridArea: 'content',
          overflow: 'auto',
          borderRadius: '20px',
          padding: '0 10px',
          scrollbarWidth: 'none',
          '&::webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {children}
      </Paper>

      <Paper
        sx={{
          gridArea: 'right',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            textOrientation: 'sideways',
            textAlign: 'center',
            writingMode: 'sideways-lr',
            borderRadius: '5px',
            padding: '15px 5px',
          }}
        >
          History
        </Typography>
      </Paper>

      <Paper
        sx={{
          gridArea: 'logs',
          overflow: 'auto',
          display: 'flex',
          alignItems: 'end',
        }}
      >
        <Logs
          isVisible={isVisible}
          setIsVisible={() => setIsVisible(!isVisible)}
        />
      </Paper>
    </Box>
  );
};

export default AppLayout;
