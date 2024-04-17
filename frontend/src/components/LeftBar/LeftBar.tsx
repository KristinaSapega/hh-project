import { FunctionComponent } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';

import MyStands from './MyStands/MyStands';
import Plugins from './Plugins/Plugins';

const LeftBar: FunctionComponent = () => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
      }}
    >
      <Accordion
        sx={{
          '&.MuiAccordion-root': {
            borderRadius: '20px',
            marginBottom: '20px',
          },
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          sx={{
            '& > *': {
              justifyContent: 'center',
            },
            '&': {
              minHeight: '0!important',
            },
            '& > .Mui-expanded': {
              margin: '12px 0!important',
            },
          }}
        >
          <Typography>Мои стенды</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            pt: 0,
          }}
        >
          <MyStands />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          '&:before': {
            display: 'none',
          },
          '&.MuiAccordion-root': {
            borderRadius: '20px',
          },
          '& .Mui-expanded': {
            minHeight: 0,
          },
        }}
      >
        <AccordionSummary
          sx={{
            '& > *': {
              justifyContent: 'center',
            },
            '&': {
              minHeight: '0!important',
            },
            '& > .Mui-expanded': {
              margin: '12px 0!important',
            },
          }}
        >
          <Typography>Плагины</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Plugins />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default LeftBar;
