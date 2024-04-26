import { FunctionComponent } from 'react';

import { Tooltip } from '@mui/material';
import { Box } from '@mui/system';

import { ElementStatusProps, Status, StatusColorMap } from '../types.d';

const statusColorMap: StatusColorMap = {
  [Status.Stopped]: 'red',
  [Status.Running]: 'green',
  [Status.Pause]: 'orange',
};

const ElementStatus: FunctionComponent<ElementStatusProps> = ({ status }) => {
  return (
    <Tooltip title={status}>
      <Box
        sx={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          backgroundColor: `${statusColorMap[status]}`,
          borderRadius: '50%',
        }}
      ></Box>
    </Tooltip>
  );
};

export default ElementStatus;
