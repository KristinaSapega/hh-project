import React, { FC, useState } from 'react';
import { Tabs, Tab, IconButton, Box, Collapse } from '@mui/material';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from '@mui/icons-material';
import { LogsProps, Stand } from '../../types';

const Logs: FC<LogsProps> = ({ isVisible, setIsVisible }) => {
  const [activeStand, setActiveStand] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const stands: Stand[] = [
    { id: 1, host: "Host 1", status: "Status 1", takenBy: "User 1" },
    { id: 2, host: "Host 2", status: "Status 2", takenBy: "User 2"},
    { id: 3, host: "Host 3", status: "Status 3", takenBy: "User 2" },
    // { id: 4, host: "Host 4", status: "Status 4", takenBy: "User 3" },
  ];

  const handleStandClick = (standId: number) => {
    setActiveStand(activeStand === standId ? null : standId);
    setActiveTab(0); // Сбрасываем внутреннюю вкладку при выборе нового стенда
  };

  const handleInnerTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <div>
        <IconButton onClick={setIsVisible}>
          {isVisible ? <ArrowDropDownOutlined /> : <ArrowDropUpOutlined />}
        </IconButton>
      </div>
      <Tabs
        value={activeStand !== null ? activeStand : false}
        variant="fullWidth"
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
                sx={{ marginTop: -5}}
              >
                {/* <Tab label="Логи" />
                <Tab label="что-то еще" /> */}

              </Tabs>
              {activeTab === 0 && (
                <div>
                  вывод логов {stand.id}
                </div>
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

export default Logs;
