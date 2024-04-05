import { FunctionComponent, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

export interface Data {
  id: number;
  name: string;
  status: JSX.Element;
}

function createData(
  id: number,
  name: string,
  status: JSX.Element,
): Data {
  return {
    id,
    name,
    status,
  };
}

enum Status {
  Stopped = 'stopped',
  Running = 'running',
  Pause = 'pause',
}

interface StatusColorMap {
  [key: string]: string;
}

const statusColorMap: StatusColorMap = {
  [Status.Stopped]: 'red',
  [Status.Running]: 'green',
  [Status.Pause]: 'orange',
};

const getStatusElement = (status: Status): JSX.Element => {
  return (
    <>
      <Box
        sx={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          mr: '10px',
          backgroundColor: `${statusColorMap[status]}`,
          borderRadius: '50%',
        }}
      ></Box>
      {status}
    </>
  );
};

const getRandomName = (): string => {
  return Array(8)
    .fill(0)
    .map(() => {
      const rndAscii = Math.ceil(Math.random() * 130);
      return String.fromCharCode(rndAscii);
    })
    .join('');
};

const initialRows = [
  createData(
    1,
    getRandomName(),
    getStatusElement(Status.Running),
  ),
  createData(
    2,
    getRandomName(),
    getStatusElement(Status.Stopped),
  ),
  createData(
    3,
    getRandomName(),
    getStatusElement(Status.Running),
  ),
  createData(
    4,
    getRandomName(),
    getStatusElement(Status.Running),
  ),
  createData(
    5,
    getRandomName(),
    getStatusElement(Status.Running),
  ),
  createData(
    6,
    getRandomName(),
    getStatusElement(Status.Running),
  ),
  createData(
    7,
    getRandomName(),
    getStatusElement(Status.Running),
  ),
  createData(
    8,
    getRandomName(),
    getStatusElement(Status.Running),
  ),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof Data>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | JSX.Element },
  b: { [key in Key]: number | string | JSX.Element },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const EnhancedTable: FunctionComponent = () => {
  const [rows, setRows] = useState<Data[]>(initialRows);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('id');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      rows
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar setRows={setRows} numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      id={labelId}
                      scope="row"
                      align="right"
                      sx={{ width: '30%' }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell sx={{ width: '30%' }} align="right">
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ width: '30%' }} align="right">
                      {row.status}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EnhancedTable;
