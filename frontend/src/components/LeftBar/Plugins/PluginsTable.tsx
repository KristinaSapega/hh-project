import { FC, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { OpenInNew } from '@mui/icons-material';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { routes } from '../../../routes/routes';
import { RootState } from '../../../store';
import { addTaskToQueue, removeTaskFromQueue } from '../../../store/tasks';

const ellipsisStyles = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const PluginsTable: FC = () => {
  const dispatch = useAppDispatch();
  const plugins = useSelector((state: RootState) => state.plugins.plugins);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const navigate = useNavigate();

  const theme = useTheme();

  const handleChange = (id: number) => (event: SyntheticEvent) => {
    event.stopPropagation();
    if (!tasks.includes(id)) {
      dispatch(addTaskToQueue(id));
    } else {
      dispatch(removeTaskFromQueue(id));
    }
  };

  const handleOpenPluginsPage = (id: number) => (event: SyntheticEvent) => {
    event.stopPropagation();
    navigate(routes.plugin.replace(':id', id.toString()));
  };

  return (
    <>
      {plugins ? (
        <TableContainer>
          <Table
            size="small"
            sx={{
              width: '100%',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Название</TableCell>
                <TableCell align="center">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plugins.map((plugin) => {
                const { id, name, description } = plugin;
                return (
                  <TableRow
                    key={id}
                    sx={{
                      backgroundColor: tasks.includes(id)
                        ? theme.palette.primary.main
                        : theme.palette.background.paper,
                    }}
                    onClick={handleChange(id)}
                  >
                    <TableCell align="center" sx={{ ...ellipsisStyles }}>
                      <Tooltip title={description}>
                        <Typography fontSize='.875rem'>{name}</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={handleOpenPluginsPage(id)}
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        <OpenInNew />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" color={theme.palette.text.secondary}>
          Пока нет плагинов
        </Typography>
      )}
    </>
  );
};

export default PluginsTable;
