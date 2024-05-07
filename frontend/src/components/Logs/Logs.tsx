import React, { FC, useEffect, useState } from 'react';

import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from '@mui/icons-material';
import { Box, Collapse, IconButton, Tab, Tabs } from '@mui/material';
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
  const stands = useAppSelector((state: RootState) => state.stands.stands); 

  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    dispatch(apiGetStands());
  }, [dispatch]);

  const [activeStand, setActiveStand] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleStandClick = async (standId: number) => {
    setActiveStand(activeStand === standId ? null : standId);
    setActiveTab(0);
    try {
      const containers = await fetchContainers(user!.header, standId);
      const allLogs = await Promise.all(containers.map(async c => {
        return await fetchLogs(standId, c.id, user!.header)
      }))
      setLogs(allLogs.flat()); 
    } catch (error) {
      console.error('Ошибка при загрузке логов:', error);
    }
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
            {stands.map((stand) => (
              <Tab
                key={stand.id}
                value={stand.id}
                label={`Стенд ${stand.id}`}
                onClick={() => handleStandClick(stand.id)}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {isVisible && (
        <Collapse in={true} timeout="auto" unmountOnExit>
          {stands.map((stand) => (
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
                logs.map(line => (
                  <div>{line}</div>
                ))
              )}
              {/* {activeTab === 1 && (
                <div>
                  вывод чего-то для стенда {stand.id}
                </div>
              )} */}
            </Box>
          ))}
        </Collapse>
      )}
    </Box>
  );
};

export default Logging;
