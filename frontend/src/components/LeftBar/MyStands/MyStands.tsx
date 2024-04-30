import { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LogoutOutlined, OpenInNew } from '@mui/icons-material';
import {
  Box,
  Button,
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
import { IconButton } from '@mui/material';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { routes } from '../../../routes/routes';
import { RootState } from '../../../store';
import { apiLeaveStand } from '../../../store/stands';
import { addStandToQueue, removeStandFromQueue } from '../../../store/tasks';
import ElementStatus from '../../ElementStatus';
import StandsModal from '../../StandsModal';

const MyStandsTable: FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const stands = useSelector((state: RootState) => state.stands.stands);
  const ownStands = stands.filter(
    (stand) => stand.takenBy === atob(user || '').split(':')[0],
  );
  const activeStands = useSelector((state: RootState) => state.tasks.stands);

  const [open, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  const dispatch = useAppDispatch();

  const handleLeaveStand = (id: number) => () => {
    dispatch(apiLeaveStand(id));
  };

  const handleChange =
    (standId: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      if (checked) {
        dispatch(addStandToQueue(standId));
      } else {
        dispatch(removeStandFromQueue(standId));
      }
    };

  return (
    <>
      {ownStands.length ? (
        <Box>
          <TableContainer>
            <Table
              size="small"
              sx={{
                width: '100%',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" />
                  <TableCell align="center">Хост</TableCell>
                  <TableCell align="center">Статус</TableCell>
                  <TableCell align="center">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ownStands.map((stand) => (
                  <TableRow key={stand.id} data-id={stand.id}>
                    <TableCell align="center">
                      <Tooltip title="Выбрать стенд">
                        <Checkbox
                          sx={{ p: 0 }}
                          inputProps={{ 'aria-label': 'controlled' }}
                          onChange={handleChange(stand.id)}
                          checked={activeStands.includes(stand.id)}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {stand.host}
                    </TableCell>
                    <TableCell align="center">
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
                        <Tooltip title="Освободить стенд">
                          <IconButton
                            size="small"
                            sx={{
                              padding: '2px',
                              color: theme.palette.text.secondary,
                            }}
                            onClick={handleLeaveStand(stand.id)}
                          >
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                        {stand.status === 'running' && (
                          <Tooltip title="Открыть страницу стенда">
                            <IconButton
                              size="small"
                              sx={{
                                padding: '2px',
                                color: theme.palette.text.secondary,
                              }}
                              onClick={() => {
                                navigate(
                                  routes.stand.replace(
                                    ':id',
                                    stand.id.toString(),
                                  ),
                                );
                              }}
                            >
                              <OpenInNew />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              padding: '10px',
              pb: 0,
            }}
          >
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => setOpen(true)}
            >
              Добавить
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography align="center" color={theme.palette.text.secondary}>
          Сначала займите стенд
        </Typography>
      )}
      <StandsModal open={open} onClose={onClose} />
    </>
  );
};

export default MyStandsTable;
