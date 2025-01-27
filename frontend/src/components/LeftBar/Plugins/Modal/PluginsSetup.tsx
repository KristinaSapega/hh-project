import { FC, FormEvent, SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Button, Tab, Tabs, Typography } from '@mui/material';

import fetchApplyPlugins from '../../../../api/fetchApplyPlugins';
import { useAuthContext } from '../../../../hooks/useAuthContext';
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

const PluginsSetup: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { user } = useAuthContext();

  let header: string | null = null;
  if (user) {
    header = user.header;
  }

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const activeStands = useSelector((state: RootState) => state.tasks.stands);
  const plugins = useSelector((state: RootState) => state.plugins.plugins);
  const pluginsById: Record<number, Plugin> = {};
  for (const plugin of plugins) {
    pluginsById[plugin.id] = plugin;
  }

  const [value, setValue] = useState<number>(0);

  const [formsData, setFormsData] = useState<{
    [key: number]: Array<{ [key: string]: string | boolean }>;
  }>(
    tasks.reduce((acc, taskId) => {
      return { ...acc, [taskId]: [] };
    }, {}),
  );

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetchApplyPlugins(
        header as string,
        activeStands,
        tasks.map((id) => {
          return {
            name: pluginsById[id].name,
            parameters: formsData[id].length
              ? {
                  services: formsData[id],
                }
              : {},
          };
        }),
      );
    } catch (error) {
      console.error('Произошла ошибка при применении плагинов:', error);
    }
    closeModal();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%',
      }}
      component="form"
      onSubmit={handleSubmit}
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
              {tasks.map((taskId) => {
                const plugin = plugins.find(
                  (plugin) => plugin.id === taskId,
                ) as Plugin;
                return (
                  <Tab key={taskId} label={plugin.name} {...a11yProps(value)} />
                );
              })}
            </Tabs>
          </Box>
          <Box>
            {tasks.map((taskId, index) => {
              const plugin = plugins.find(
                (plugin) => plugin.id === taskId,
              ) as Plugin;
              return (
                <CustomTabPanel key={taskId} value={value} index={index}>
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
          type="submit"
        >
          Применить
        </Button>
      </Box>
    </Box>
  );
};

export default PluginsSetup;
