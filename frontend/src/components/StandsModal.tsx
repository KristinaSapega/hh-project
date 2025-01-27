import { FC } from 'react';
import { useSelector } from 'react-redux';

import { Box, Modal, Paper, Typography } from '@mui/material';
import { RootState } from '../store';
import { ModalProps } from '../types';
import Stands from './Stands';

const StandsModal: FC<ModalProps> = ({ open, onClose }) => {
  const stands = useSelector((state: RootState) => state.stands.stands);

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
        {!stands.length ? (
          <Box
            height={200}
            width={400}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>Нет доступных стендов</Typography>
          </Box>
        ) : (
          <>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 10px',
              }}
            >
              <h1
                style={{
                  fontFamily: 'monospace, Responsive, Arial, sans-serif',
                }}
              >
                Список стендов
              </h1>
            </Box>
            <Stands stands={stands} onClose={onClose} />
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default StandsModal;
