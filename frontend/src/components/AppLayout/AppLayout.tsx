import { FunctionComponent, ReactNode, useState } from 'react';

import { Box, Paper } from '@mui/material';

import History from '../History/History';
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
  const [isLogsVisible, setIsLogsVisible] = useState<boolean>(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: 'grid',
        height: 'calc(100vh - 85px)',
        gap: '20px',
        margin: '0 20px',
        gridTemplateColumns: isHistoryVisible ? '450px 50fr 200px' : '450px 50fr 40px',
        gridTemplateRows: isLogsVisible ? 'auto 300px' : 'auto 40px',
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
        <Box
          sx={{
            borderRadius: '5px',
            ...scrollStyles,
          }}
        >
          <History
            isVisible={isHistoryVisible}
            setIsVisible={() => setIsHistoryVisible(!isHistoryVisible)}
          />
        </Box>
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
          isVisible={isLogsVisible}
          setIsVisible={() => setIsLogsVisible(!isLogsVisible)}
        />
      </Paper>
    </Box>
  );
};

export default AppLayout;
