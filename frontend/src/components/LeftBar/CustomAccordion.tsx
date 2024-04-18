import { FunctionComponent } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

import { CustomAccordionProps } from '../../types';

const accordionStyles = {
  '&:before': {
    display: 'none',
  },
  '&.MuiAccordion-root': {
    borderRadius: '20px',
    marginBottom: '20px',
  },
  '& .Mui-expanded': {
    minHeight: 0,
  },
};

const accordionSummaryStyles = {
  '& > *': {
    justifyContent: 'center',
  },
  '&': {
    minHeight: '0!important',
  },
  '& > .Mui-expanded': {
    margin: '12px 0!important',
  },
};

const CustomAccordion: FunctionComponent<CustomAccordionProps> = ({
  title,
  children,
}) => {
  return (
    <Accordion
      sx={{
        ...accordionStyles,
      }}
    >
      <AccordionSummary
        sx={{
          ...accordionSummaryStyles,
        }}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          pt: 0,
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
