// import React, { FC, useState } from 'react';

// import {
//   ArrowDropDownOutlined,
//   ArrowDropUpOutlined,
// } from '@mui/icons-material';
// import { Box, Collapse, IconButton, Tab, Tabs } from '@mui/material';

// import { LogsProps, Stand } from '../../types';

// const Logs: FC<LogsProps> = ({ isVisible, setIsVisible }) => {
//   const [activeStand, setActiveStand] = useState<number | null>(null);
//   const [activeTab, setActiveTab] = useState(0);

//   const stands: Stand[] = [
//     { id: 1, host: 'Host 1', status: 'Status 1', takenBy: 'User 1' },
//     { id: 2, host: 'Host 2', status: 'Status 2', takenBy: 'User 2' },
//     { id: 3, host: 'Host 3', status: 'Status 3', takenBy: 'User 2' },
//     // { id: 4, host: "Host 4", status: "Status 4", takenBy: "User 3" },
//   ];

//   const handleStandClick = (standId: number) => {
//     setActiveStand(activeStand === standId ? null : standId);
//     setActiveTab(0); // Сбрасываем внутреннюю вкладку при выборе нового стенда
//   };

//   const handleInnerTabChange = (
//     _event: React.SyntheticEvent,
//     newValue: number,
//   ) => {
//     setActiveTab(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       {!isVisible ? (
//         <IconButton onClick={setIsVisible}>
//           <ArrowDropUpOutlined />
//         </IconButton>
//       ) : (
//         <Box sx={{ display: 'flex' }}>
//           <IconButton onClick={setIsVisible} sx={{ width: '48px' }}>
//             <ArrowDropDownOutlined />
//           </IconButton>
//           <Tabs
//             value={activeStand !== null ? activeStand : false}
//             // variant="scrollable"
//             indicatorColor="primary"
//             textColor="primary"
//           >
//             {stands.map((stand) => (
//               <Tab
//                 key={stand.id}
//                 value={stand.id}
//                 label={`Стенд ${stand.id}`}
//                 onClick={() => handleStandClick(stand.id)}
//               />
//             ))}
//           </Tabs>
//         </Box>
//       )}

//       {isVisible && (
//         <Collapse in={true} timeout="auto" unmountOnExit>
//           {stands.map((stand) => (
//             <Box
//               key={stand.id}
//               p={3}
//               sx={{
//                 position: 'relative',
//                 display: activeStand === stand.id ? 'block' : 'none',
//               }}
//             >
//               <Tabs
//                 value={activeTab}
//                 onChange={handleInnerTabChange}
//                 variant="fullWidth"
//                 indicatorColor="primary"
//                 textColor="primary"
//                 orientation="vertical"
//                 sx={{ marginTop: -5 }}
//               >
//               </Tabs>
//               {activeTab === 0 && <div>вывод логов {stand.id}</div>}
//               {/* {activeTab === 1 && (
//                 <div>
//                   вывод чего-то для стенда {stand.id}
//                 </div>
//               )} */}
//             </Box>
//           ))}
//         </Collapse>
//       )}
//     </Box>
//   );
// };

// export default Logs;
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from '@mui/icons-material';
import { Box, Collapse, IconButton, Tab, Tabs } from '@mui/material';
import { LogsProps, Stand} from '../../types';
import { RootState } from '../../store';
import { apiGetStands } from '../../store/stands';


const Logs: FC<LogsProps> = ({ isVisible, setIsVisible }) => {
  const dispatch = useDispatch();
  const stands = useSelector((state: RootState) => state.stands.stands); 
  const [, setFilteredStands] = useState<Stand[]>([]); 

  useEffect(() => {
    dispatch(apiGetStands());
  }, [dispatch]);

  useEffect(() => {
    if (stands.length > 0) {
      const userStands = stands.filter((stand) => stand.takenBy === 'User 1'); 
      setFilteredStands(userStands);
    }
  }, [stands]);

  const [activeStand, setActiveStand] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleStandClick = (standId: number) => {
    setActiveStand(activeStand === standId ? null : standId);
    setActiveTab(0); // Сбрасываем внутреннюю вкладку при выборе нового стенда
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
