import React, { FC, useCallback, useEffect, useState } from 'react';

import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from '@mui/icons-material';
import { Box, Collapse, FormControl, IconButton, MenuItem, Select, Tab, Tabs } from '@mui/material';
import { LogsProps } from '../../types';
import { RootState } from '../../store';
import { apiGetStands } from '../../store/stands';
import fetchLogs from '../../api/fetchLogs';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAuth } from '../../hooks/useAuth';
import fetchContainers from '../../api/fetchContainers';


const Logging: FC<LogsProps> = ({ isVisible, setIsVisible }) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const ownStands = useAppSelector(
    (state: RootState) => state.stands.stands,
  ).filter((stand) => stand.takenBy === user?.login); 

  const [logs, setLogs] = useState<{ [standId: number]: { [containerId: string]: string[] } }>({});

  useEffect(() => {
    dispatch(apiGetStands());
  }, [dispatch]);

  const [activeStand, setActiveStand] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedContainer, setSelectedContainer] = useState<{ [standId: number]: string | null }>({});

  const updateLogs = useCallback(async (standId: number) => {
    try {
      const containers = await fetchContainers(user!.header, standId);
      const logsData: { [containerId: string]: string[] } = {};
      await Promise.all(containers.map(async c => {
        const containerLogs = await fetchLogs(standId, c.id, user!.header);
        logsData[c.id as unknown as string] = containerLogs;
      }));
      setLogs(prevLogs => ({
        ...prevLogs,
        [standId]: logsData,
      }));
    } catch (error) {
      console.error('Ошибка при загрузке логов:', error);
    }
  }, [user])

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
    setSelectedContainer(prevState => ({
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
        <Box sx={{ display: 'flex' }}>
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
              >
              </Tabs>
              {activeTab === 0 && (
                <>
                  <FormControl size="small" sx={{ p: '10px', height: '50px', marginTop: '-25px' }}>
                    <Select
                      displayEmpty
                      value={selectedContainer[stand.id] || ''}
                      onChange={(e) => setSelectedContainer(prevState => ({
                        ...prevState,
                        [stand.id]: e.target.value || null,

                      })
                      )}
                      sx={{
                        '& .MuiSelect-selectMenu': { // Уменьшаем размер шрифта
                          fontSize: '0.9rem', 
                        },
                        '& .MuiOutlinedInput-input': { // Уменьшаем размер шрифта во вводе
                          fontSize: '0.9rem',
                        },
                        '& .MuiListItem-root': { // Уменьшаем размер шрифта в элементах выпадающего списка
                          fontSize: '0.8rem', 
                        },
                      }}
                    >
                      <MenuItem disabled value="">
                        Выберите контейнер
                      </MenuItem>

                      {logs[stand.id] && Object.keys(logs[stand.id]).map(containerId => (
                        <MenuItem key={containerId} value={containerId}>
                          Контейнер {containerId}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {selectedContainer[stand.id] && (
                    <div>
                      {logs[stand.id][selectedContainer[stand.id] as string].map((line: string, index: number) => (
                        <div key={index}style={{ fontSize: '0.8rem', marginTop: '1rem' }}>{line}</div>
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
