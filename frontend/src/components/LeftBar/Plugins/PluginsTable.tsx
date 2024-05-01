import { ChangeEvent, FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { OpenInNew } from '@mui/icons-material';
import {
  Checkbox,
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

  const handleChange =
    (pluginId: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      if (checked) {
        dispatch(addTaskToQueue(pluginId));
      } else {
        dispatch(removeTaskFromQueue(pluginId));
      }
    };

  return (
    <>
      {plugins ? (
        <TableContainer>
          <Table
            size="small"
            sx={{
              tableLayout: 'fixed',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: '20px' }} />
                <TableCell align="center">Название</TableCell>
                <TableCell align="center">Описание</TableCell>
                <TableCell align="center">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plugins.map((plugin) => (
                <TableRow key={plugin.id}>
                  <TableCell align="center">
                    <Checkbox
                      sx={{ p: 0 }}
                      inputProps={{ 'aria-label': 'controlled' }}
                      onChange={handleChange(plugin.id)}
                      checked={tasks.includes(plugin.id)}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ ...ellipsisStyles }}>
                    <Tooltip title={plugin.description}>
                      <>{plugin.type}</>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center" sx={{ ...ellipsisStyles }}>
                    {plugin.description}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => {
                        navigate(
                          routes.plugin.replace(':id', plugin.id.toString()),
                        );
                      }}
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      <OpenInNew />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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
