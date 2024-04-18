import { FunctionComponent, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { Plugin } from '../../../types';
import CustomTabPanel from './CustomTabPanel';
import PluginsTable from './PluginsTable';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const data: Array<Plugin> = [
  {
    id: 1,
    name: 'deploy',
    description: 'Деплой ветки на стенде',
  },
  {
    id: 2,
    name: 'deploy',
    description: 'Деплой ветки на стенде',
  },
  {
    id: 3,
    name: 'deploy',
    description: 'Деплой ветки на стенде',
  },
];

const Plugins: FunctionComponent = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 0 }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Все плагины" {...a11yProps(0)} />
          <Tab label="Мои плагины" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PluginsTable plugins={data} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PluginsTable plugins={data} />
      </CustomTabPanel>
    </Box>
  );
};

export default Plugins;
