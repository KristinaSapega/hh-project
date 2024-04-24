import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Modal, Paper } from '@mui/material';

import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { resetTasks } from '../../../../reducers/tasksReducer';
import { RootState } from '../../../../store';
import { PluginsModalProps } from '../../../../types';
import PluginsSetup from './PluginsSetup';

const PluginsModal: FunctionComponent<PluginsModalProps> = ({
  open,
  onClose,
}) => {
  const stands = useSelector((state: RootState) => state.tasks.stands);
  const dispatch = useAppDispatch();

  const handleTasksRun = () => {
    // ЗАПРОС НА БЕК С ТАСКАМИ
    if (stands.length) {
      handleClose();
      alert('ЗАПРОС НА БЕК');
      dispatch(resetTasks());
    } else {
      alert('Не выбрано ни одного стенда');
    }
  };

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
        <PluginsSetup handleTasksRun={handleTasksRun} />
      </Paper>
    </Modal>
  );
};

export default PluginsModal;
