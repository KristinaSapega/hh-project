import React, { FC, useCallback, useEffect, useState } from 'react';

import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from '@mui/material';

import fetchContainers from '../../api/fetchContainers';
import fetchLogs from '../../api/fetchLogs';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAuthContext } from '../../hooks/useAuthContext';
import { RootState } from '../../store';
import { apiGetStands } from '../../store/stands';
import { LogsProps } from '../../types';

const Logging: FC<LogsProps> = ({ isVisible, setIsVisible }) => {
  const { user } = useAuthContext();
  const dispatch = useAppDispatch();
  const ownStands = useAppSelector(
    (state: RootState) => state.stands.stands,
  ).filter((stand) => stand.takenBy === user?.login);

  const [logs, setLogs] = useState<{
    [standId: number]: { [containerId: string]: string[] };
  }>({});

  useEffect(() => {
    if (user) {
      dispatch(apiGetStands(user.header));
    }
  }, [user, dispatch]);

  const [activeStand, setActiveStand] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedContainer, setSelectedContainer] = useState<{
    [standId: number]: string | null;
  }>({});

  const updateLogs = useCallback(
    async (standId: number) => {
      try {
        const containers = await fetchContainers(user!.header, standId);
        const logsData: { [name: string]: string[] } = {};
        await Promise.all(
          containers.map(async (c) => {
            const containerLogs = await fetchLogs(standId, c.id, user!.header);
            logsData[c.name as unknown as string] = containerLogs;
          }),
        );
        setLogs((prevLogs) => ({
          ...prevLogs,
          [standId]: logsData,
        }));
      } catch (error) {
        console.error('Ошибка при загрузке логов:', error);
      }
    },
    [user],
  );

  useEffect(() => {
    if (activeStand === null) return;
    const intervalId = setInterval(() => {
      updateLogs(activeStand);
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [activeStand, dispatch, updateLogs]);

  const handleStandClick = async (standId: number) => {
    setActiveStand(activeStand === standId ? null : standId);
    setActiveTab(0);
    updateLogs(standId);
    setSelectedContainer((prevState) => ({
      ...prevState,
      [standId]: null,
    }));
  };

  const handleInnerTabChange = (
    _event: React.SyntheticEvent,
    newValue: number,
  ) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {!isVisible ? (
        <IconButton onClick={setIsVisible}>
          <ArrowDropUpOutlined />
        </IconButton>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={setIsVisible} sx={{ width: '48px' }}>
            <ArrowDropDownOutlined />
          </IconButton>
          <Tabs
            value={activeStand !== null ? activeStand : false}
            indicatorColor="primary"
            textColor="primary"
          >
            {ownStands.map((stand) => (
              <Tab
                key={stand.id}
                value={stand.id}
                label={stand.host}
                onClick={() => handleStandClick(stand.id)}
              />
            ))}
          </Tabs>
          {activeStand !== null && (
            <FormControl
              size="small"
              sx={{ p: '10px', height: '50px', marginLeft: 'auto' }}
            >
              <Select
                displayEmpty
                value={selectedContainer[activeStand || 0] || ''}
                onChange={(e) =>
                  setSelectedContainer((prevState) => ({
                    ...prevState,
                    [activeStand || 0]: e.target.value || null,
                  }))
                }
                sx={{
                  '& .MuiSelect-selectMenu': {
                    fontSize: '0.9rem',
                  },
                  '& .MuiOutlinedInput-input': {
                    fontSize: '0.9rem',
                  },
                  '& .MuiListItem-root': {
                    fontSize: '0.8rem',
                  },
                }}
              >
                <MenuItem disabled value="" sx={{ display: 'none' }}>
                  Выберите контейнер
                </MenuItem>
                {logs[activeStand || 0] &&
                  Object.keys(logs[activeStand || 0]).map((containerId) => (
                    <MenuItem
                      key={containerId}
                      value={containerId}
                      sx={{ fontSize: '.8rem' }}
                    >
                      {containerId}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </Box>
      )}

      {isVisible && (
        <Collapse in={true} timeout="auto" unmountOnExit>
          {ownStands.map((stand) => (
            <Box
              key={stand.id}
              p={3}
              sx={{
                position: 'relative',
                display: activeStand === stand.id ? 'block' : 'none',
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleInnerTabChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                orientation="vertical"
                sx={{ marginTop: -5 }}
              ></Tabs>
              {activeTab === 0 && (
                <>
                  {selectedContainer[stand.id] && (
                    <div>
                      {logs[stand.id][
                        selectedContainer[stand.id] as string
                      ].map((line: string, index: number) => (
                        <div
                          key={index}
                          style={{ fontSize: '0.8rem', marginTop: '1rem' }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </Box>
          ))}
        </Collapse>
      )}
    </Box>
  );
};

export default Logging;
