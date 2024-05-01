import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Button, Tab, Tabs } from '@mui/material';

import { RootState } from '../../../store';
import CustomTabPanel from '../../CustomTabPanel';
import PluginsModal from './Modal/PluginsModal';
import PluginsTable from './PluginsTable';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Plugins: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const activeStands = useSelector((state: RootState) => state.tasks.stands);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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
        <PluginsTable />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            marginTop: '10px',
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpen(true)}
            disabled={!tasks.length || !activeStands.length}
          >
            Применить
          </Button>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PluginsTable />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            marginTop: '10px',
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleOpen}
            disabled={!tasks.length || !activeStands.length}
          >
            Применить
          </Button>
        </Box>
      </CustomTabPanel>

      <PluginsModal open={open} onClose={handleClose} />
    </Box>
  );
};

export default Plugins;
