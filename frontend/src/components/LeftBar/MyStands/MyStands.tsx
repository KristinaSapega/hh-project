import { FC, SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LogoutOutlined, OpenInNew } from '@mui/icons-material';
import {
  Box,
  Button,
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

  let login = null;
  if (user) {
    login = user.login;
  }
  const navigate = useNavigate();

  const stands = useSelector((state: RootState) => state.stands.stands);
  const ownStands = stands.filter((stand) => stand.takenBy === login);
  const activeStands = useSelector((state: RootState) => state.tasks.stands);

  const [open, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  const dispatch = useAppDispatch();

  const handleLeaveStand = (id: number) => (event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch(apiLeaveStand(id));
    dispatch(removeStandFromQueue(id));
  };

  const handleOpenStandPage = (id: number) => (event: SyntheticEvent) => {
    event.stopPropagation();
    navigate(routes.stand.replace(':id', id.toString()));
  };

  const handleChange = (id: number) => () => {
    if (!activeStands.includes(id)) {
      dispatch(addStandToQueue(id));
    } else {
      dispatch(removeStandFromQueue(id));
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
                  <TableCell align="center">Хост</TableCell>
                  <TableCell align="center">Статус</TableCell>
                  <TableCell align="center">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ownStands.map((stand) => {
                  const { id, status, host } = stand;
                  return (
                    <TableRow
                      key={id}
                      data-id={id}
                      sx={{
                        backgroundColor: activeStands.includes(id)
                          ? theme.palette.primary.main
                          : theme.palette.background.paper,
                      }}
                      onClick={handleChange(id)}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {host}
                      </TableCell>
                      <TableCell align="center">
                        <ElementStatus status={status} />
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
                              onClick={handleLeaveStand(id)}
                            >
                              <LogoutOutlined />
                            </IconButton>
                          </Tooltip>
                          {status === 'running' && (
                            <Tooltip title="Открыть страницу стенда">
                              <IconButton
                                size="small"
                                sx={{
                                  padding: '2px',
                                  color: theme.palette.text.secondary,
                                }}
                                onClick={handleOpenStandPage(id)}
                              >
                                <OpenInNew />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
