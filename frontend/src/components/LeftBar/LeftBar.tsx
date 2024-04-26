import { FunctionComponent } from 'react';

import { Box } from '@mui/material';

import CustomAccordion from './CustomAccordion';
import MyStands from './MyStands/MyStands';
import Plugins from './Plugins/Plugins';

const LeftBar: FunctionComponent = () => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
      }}
    >
      <CustomAccordion title="Мои стенды">
        <MyStands />
      </CustomAccordion>

      <CustomAccordion title="Плагины">
        <Plugins />
      </CustomAccordion>
    </Box>
  );
};

export default LeftBar;
