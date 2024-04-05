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

interface Row {
  option: string;
  value: string;
}

const getRow = (option: string, value: string): Row => ({ option, value });

const rows: Row[] = [
  getRow('Хост', 'Василий'),
  getRow('Статус', 'Running'),
  getRow('Пользователь', 'Пользователь'),
];

const StandInfo = () => {
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
