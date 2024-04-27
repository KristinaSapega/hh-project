import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Box, Modal, Paper, Typography } from '@mui/material';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { RootState } from '../store';
import { ModalProps } from '../types';
import Stands from './Stands';
import { apiGetStands } from '../store/stands';

const StandsModal: FC<ModalProps> = ({ open, onClose }) => {

  const stands = useSelector((state: RootState) => state.stands.stands);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(apiGetStands());
  }, [dispatch]);

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
