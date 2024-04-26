import { FunctionComponent } from 'react';

import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { LogsProps } from '../../types';

const Logs: FunctionComponent<LogsProps> = ({ isVisible, setIsVisible }) => {
  return (
    <IconButton onClick={setIsVisible}>
      {isVisible ? <ArrowDropDownOutlined /> : <ArrowDropUpOutlined />}
    </IconButton>
  );
};

export default Logs;
