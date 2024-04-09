import { FunctionComponent } from 'react';

import { Box } from '@mui/system';

import { ElementStatusProps, Status, StatusColorMap } from '../types';

const statusColorMap: StatusColorMap = {
  [Status.Stopped]: 'red',
  [Status.Running]: 'green',
  [Status.Pause]: 'orange',
};

const ElementStatus: FunctionComponent<ElementStatusProps> = ({ status }) => {
  return (
    <>
      <Box
        sx={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          mr: '10px',
          backgroundColor: `${statusColorMap[status]}`,
          borderRadius: '50%',
        }}
      ></Box>
      {status}
    </>
  );
};

export default ElementStatus;
