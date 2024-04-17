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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useAuthContext();

  useEffect(() => {
    const getStandContainer = async () => {
      setIsLoading(true);
      const data = await api.fetchContainers(user ?? '', id);
      await setContainers(data.containers);
      setIsLoading(false);
    };

    getStandContainer();
  }, [user, id]);

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
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {!isLoading && (
          <>
            {/* <StandTableToolbar /> */}
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
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
                        <TableCell
                          id={labelId}
                          scope="row"
                          align="right"
                          sx={{ width: '30%' }}
                        >
                          {container.id}
                        </TableCell>
                        <TableCell sx={{ width: '30%' }} align="right">
                          {container.name}
                        </TableCell>
                        <TableCell sx={{ width: '30%' }} align="right">
                          <ElementStatus status={container.state} />
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
              count={containers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default StandTable;
