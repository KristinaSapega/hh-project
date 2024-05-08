import { FC } from 'react';

import { Modal, Paper } from '@mui/material';

import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { resetTasks } from '../../../../store/tasks';
import { PluginsModalProps } from '../../../../types';
import PluginsSetup from './PluginsSetup';

const PluginsModal: FC<PluginsModalProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(resetTasks());
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        sx={{
          position: 'absolute',
          width: '50%',
          height: '70%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          overflow: 'auto',
          scrollbarWidth: 'none',
          '&::webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <PluginsSetup closeModal={handleClose} />
      </Paper>
    </Modal>
  );
};

export default PluginsModal;
