import { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Box, Modal, Paper, Typography } from '@mui/material';

import fetchStands from '../api/fetchStands';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAuthContext } from '../hooks/useAuthContext';
import { giveStands } from '../reducers/standsReducer';
import { RootState } from '../store';
import { ModalProps, Stand } from '../types';
import Stands from './Stands';

const StandsModal: FunctionComponent<ModalProps> = ({ open, onClose }) => {
  const { user } = useAuthContext();

  const stands = useSelector((state: RootState) => state.stands.stands);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const fetchedStands: Stand[] = await fetchStands(user!);
      dispatch(giveStands(fetchedStands));
    })();
  }, [user, dispatch]);

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
        {/* TODO Добавить проверку на наличие стендов */}
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
            <Stands stands={stands} />
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default StandsModal;
