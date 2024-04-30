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
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

import { RootState } from '../../../store';

const ellipsisStyles = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const PluginsTable: FunctionComponent = () => {
  const plugins = useSelector((state: RootState) => state.plugins.plugins);

  const theme = useTheme();

  const handleChange =
    (pluginId: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      if (checked) {
      } else {
      }
      // TODO добавлять/удалять плагин из списка тасок при переключении чекбокса
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
