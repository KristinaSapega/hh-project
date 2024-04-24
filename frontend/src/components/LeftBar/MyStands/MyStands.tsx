import { ChangeEvent, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LogoutOutlined, OpenInNew } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { IconButton } from '@mui/material';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAuthContext } from '../../../hooks/useAuthContext';
import {
  addStandToTasks,
  removeStandFromTasks,
} from '../../../reducers/tasksReducer';
import { routes } from '../../../routes/routes';
import { RootState } from '../../../store';
import ElementStatus from '../../ElementStatus';

const MyStandsTable: FunctionComponent = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const stands = useSelector((state: RootState) => state.stands.stands);
  const ownStands = stands.filter(
    (stand) => stand.takenBy === atob(user || '').split(':')[0],
  );
  const activeStands = useSelector((state: RootState) => state.tasks.stands);
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const handleChange =
    (standId: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      if (checked) {
        dispatch(addStandToTasks(standId));
      } else {
        dispatch(removeStandFromTasks(standId));
      }
    };

  return (
    <>
      {ownStands && (
        <TableContainer>
          <Table
            size="small"
            sx={{
              tableLayout: 'fixed',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: '20px', p: 0 }} />
                <TableCell align="center">Хост</TableCell>
                <TableCell align="center">Статус</TableCell>
                <TableCell align="center">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ownStands.map((stand) => (
                <TableRow key={stand.id} data-id={stand.id}>
                  <TableCell align="center">
                    <Checkbox
                      sx={{ p: 0, width: '20px' }}
                      inputProps={{ 'aria-label': 'controlled' }}
                      onChange={handleChange(stand.id)}
                      checked={activeStands.includes(stand.id)}
                    />
                  </TableCell>
                  <TableCell align="center">{stand.host}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <ElementStatus status={stand.status} />
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    <Box
                      sx={{
                        '&:focus': {
                          outline: 'none',
                        },
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          padding: '2px',
                          color: theme.palette.text.secondary,
                        }}
                        onClick={() => {}}
                      >
                        <LogoutOutlined />
                      </IconButton>
                      {stand.status === 'running' && (
                        <IconButton
                          size="small"
                          sx={{
                            padding: '2px',
                            color: theme.palette.text.secondary,
                          }}
                          onClick={() => {
                            navigate(
                              routes.stand.replace(':id', stand.id.toString()),
                            );
                          }}
                        >
                          <OpenInNew />
                        </IconButton>
                      )}
                    </Box>
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

export default MyStandsTable;
