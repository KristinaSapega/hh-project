import { FunctionComponent } from 'react';

import { Box, Modal, Paper } from '@mui/material';

import { ModalProps } from '../types';
import Stands from './Stands';

const StandsModal: FunctionComponent<ModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '10px',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 10px',
          }}
        >
          <h1
            style={{ fontFamily: 'monospace, Responsive, Arial, sans-serif' }}
          >
            Список стендов
          </h1>
        </Box>
        <Stands />
      </Paper>
    </Modal>
  );
};

export default StandsModal;
