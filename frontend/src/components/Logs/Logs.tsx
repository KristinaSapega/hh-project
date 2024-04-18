import { FunctionComponent } from 'react';

import { Button } from '@mui/material';

import { LogsProps } from '../../types';

const Logs: FunctionComponent<LogsProps> = ({ isVisible, setIsVisible }) => {
  return (
    <>
      {isVisible ? (
        <Button variant='outlined' color='error' onClick={setIsVisible}>Hide</Button>
      ) : (
        <Button variant='outlined' color='error' onClick={setIsVisible}>Open</Button>
      )}
    </>
  );
};

export default Logs;
