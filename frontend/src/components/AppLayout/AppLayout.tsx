import { FunctionComponent, ReactNode, useState } from 'react';

import { Box, Paper, Typography } from '@mui/material';

import LeftBar from '../LeftBar/LeftBar';
import Logs from '../Logs/Logs';

const scrollStyles = {
  scrollbarWidth: 'none',
  overflow: 'auto',
  '&::webkit-scrollbar': {
    display: 'none',
  },
};

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
        gridTemplateColumns: '450px 50fr 40px',
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
          ...scrollStyles,
        }}
      >
        <LeftBar />
      </Box>

      <Paper
        sx={{
          gridArea: 'content',
          borderRadius: '20px',
          padding: '0 10px',
          ...scrollStyles,
        }}
      >
        {children}
      </Paper>

      <Paper
        sx={{
          gridArea: 'right',
          display: 'flex',
          borderRadius: '20px',
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
          justifyContent: 'end',
          alignItems: 'start',
          borderRadius: '20px',
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
