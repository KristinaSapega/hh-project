import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import api from '../../../api';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Container } from '../../../types';
import ElementStatus from '../../ElementStatus';
import StandTableHeader from './StandTableHeader';

const CONTAINER_ID_MAX_SYMBOLS = 8;

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

function getComparator<Key extends keyof Container>(
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

const StandTable: FunctionComponent<{ id: number }> = ({ id }) => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Container>('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { user } = useAuthContext();

  let header = null;
  if (user) {
    header = user.header;
  }

  useEffect(() => {
    const getStandContainer = async () => {
      const data = await api.fetchContainers(header as string, id);
      if (data.containers.length !== containers.length) {
        await setContainers(data.containers);
      }
    };

    const interval: number = setInterval(getStandContainer, 500);

    return () => {
      clearInterval(interval);
    };
  }, [header, id, containers.length]);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Container,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - containers.length) : 0;

  const visibleRows = useMemo(
    () =>
      containers.length
        ? containers
            .slice()
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : [],
    [order, orderBy, page, rowsPerPage, containers],
  );

  return (
    <>
      {!!containers.length && (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size="medium">
                <StandTableHeader
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {visibleRows.map((container, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover tabIndex={-1} key={container.id}>
                        <TableCell id={labelId} scope="row" align="right">
                          {container.id.slice(0, CONTAINER_ID_MAX_SYMBOLS)}
                        </TableCell>
                        <TableCell align="right">{container.name}</TableCell>
                        <TableCell align="right">
                          <ElementStatus status={container.state} />
                        </TableCell>
                        <TableCell align="right">{container.status}</TableCell>
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
            {containers.length > rowsPerPage && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={containers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Paper>
        </Box>
      )}
    </>
  );
};

export default StandTable;
