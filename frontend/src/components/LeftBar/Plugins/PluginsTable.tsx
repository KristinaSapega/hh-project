import { ChangeEvent, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import {
  addTaskToTasks,
  removeTaskFromTasks,
} from '../../../reducers/tasksReducer';
import { RootState } from '../../../store';

const ellipsisStyles = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const PluginsTable: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const plugins = useSelector((state: RootState) => state.plugins.plugins);
  const activePlugins = useSelector(
    (state: RootState) => state.tasks.tasks,
  ).map(({ taskId }) => taskId);

  const handleChange =
    (pluginId: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      if (checked) {
        dispatch(addTaskToTasks(pluginId));
      } else {
        dispatch(removeTaskFromTasks(pluginId));
      }
    };

  return (
    <>
      {plugins && (
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
                {/* <TableCell align="center">Действия</TableCell> */}
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
                      checked={activePlugins.includes(plugin.id)}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ ...ellipsisStyles }}>
                    {plugin.name}
                  </TableCell>
                  <TableCell align="center" sx={{ ...ellipsisStyles }}>
                    {plugin.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default PluginsTable;
