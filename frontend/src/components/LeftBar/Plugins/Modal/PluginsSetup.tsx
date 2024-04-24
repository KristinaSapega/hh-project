import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Button, Tab, Tabs, Typography } from '@mui/material';

import { RootState } from '../../../../store';
import { Plugin } from '../../../../types';
import CustomTabPanel from '../../../CustomTabPanel';
import FormGenerator from '../../../FormGenerator';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const buttonStyles = {
  width: 150,
};

interface PluginsSetupProps {
  handleTasksRun: () => void;
}

const PluginsSetup: FunctionComponent<PluginsSetupProps> = ({
  handleTasksRun,
}) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const plugins = useSelector((state: RootState) => state.plugins.plugins);

  const [value, setValue] = useState<number>(0);

  const [formsData, setFormsData] = useState<{
    [key: number]: { [key: string]: string | boolean };
  }>(
    tasks.reduce((acc, task) => {
      return { ...acc, [task.taskId]: {} };
    }, {}),
  );

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box>
        <Typography variant="h5" align="center">
          Конфигурация плагинов
        </Typography>
        <Box>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {tasks.map((task) => {
                const plugin = plugins.find(
                  (plugin) => plugin.id === task.taskId,
                ) as Plugin;
                return (
                  <Tab
                    key={task.id}
                    label={plugin.name}
                    {...a11yProps(value)}
                  />
                );
              })}
            </Tabs>
          </Box>
          <Box>
            {tasks.map((task, index) => {
              const plugin = plugins.find(
                (plugin) => plugin.id === task.taskId,
              ) as Plugin;
              return (
                <CustomTabPanel key={task.id} value={value} index={index}>
                  <FormGenerator
                    plugin={plugin}
                    formData={formsData[plugin.id]}
                    setFormsData={setFormsData}
                  />
                </CustomTabPanel>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Box>
        <Button
          sx={{
            ...buttonStyles,
          }}
          onClick={() => {
            setValue(value - 1);
          }}
          disabled={value === 0}
        >
          Назад
        </Button>
        <Button
          sx={{
            ...buttonStyles,
          }}
          onClick={() => {
            setValue(value + 1);
          }}
          disabled={value === tasks.length - 1}
        >
          Далее
        </Button>
        <Button
          sx={{
            ...buttonStyles,
          }}
          variant="contained"
          color="success"
          onClick={handleTasksRun}
        >
          Применить
        </Button>
      </Box>
    </Box>
  );
};

export default PluginsSetup;
