import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import api from '../../api';
import { useAuthContext } from '../../hooks/useAuthContext';

interface Row {
  option: string;
  value: string;
}

interface Stand {
  id: number;
  host: string;
  status: string;
  takenBy: string;
}

// const getRow = (option: string, value: string): Row => ({ option, value });

// const options = {
//   host: 'Хост',
//   status: 'Статус',
//   takenBy: 'Пользователь',
// };

// const rows: Row[] = [
//   getRow('Хост', 'Василий'),
//   getRow('Статус', 'Running'),
//   getRow('Пользователь', 'Пользователь'),
// ];

const StandInfo: FunctionComponent<{ id: number }> = ({ id }) => {
  const [stand, setStand] = useState<Stand | null>(null);
  const [rows, setRows] = useState<Row[]>([]);

  const { user, logout } = useAuthContext();

  useEffect(() => {
    const getStand = async () => {
      try {
        const stand = await api.fetchStand(user ?? '', id);
        setStand(stand);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      console.log(user, id);
      getStand();
    } else {
      logout();
    }
  }, [user]);

  if (stand) {
    setRows([
      {
        option: 'Хост',
        value: stand.host,
      },
      {
        option: 'Статус',
        value: stand.status,
      },
      {
        option: 'Пользователь',
        value: stand.takenBy,
      },
    ]);
  }

  return (
    <Paper sx={{ mt: 2, mb: 2, p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Информация о стенде
      </Typography>

      <Table
        size="medium"
        sx={{ tableLayout: 'fixed', maxWidth: { md: '25%' } }}
      >
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.option}>
                <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                  {row.option}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: 'none',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Tooltip title={row.value}>
                    <Box component="span">{row.value}</Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StandInfo;
