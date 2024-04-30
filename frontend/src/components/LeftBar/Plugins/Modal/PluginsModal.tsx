import { FunctionComponent } from 'react';

import { Modal, Paper } from '@mui/material';

import { PluginsModalProps } from '../../../../types';

const PluginsModal: FunctionComponent<PluginsModalProps> = ({
  open,
  onClose,
}) => {
  const handleClose = () => {
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
      </Paper>
    </Modal>
  );
};

export default PluginsModal;
