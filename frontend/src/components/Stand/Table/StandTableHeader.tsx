import { FunctionComponent } from 'react';

import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { Container, HeadCell, StandTableHeaderProps } from '../../../types';

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'id сервиса',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Имя',
  },
  {
    id: 'state',
    numeric: true,
    disablePadding: false,
    label: 'Статус',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Запущен',
  }
];

const StandTableHeader: FunctionComponent<StandTableHeaderProps> = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Container) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default StandTableHeader;
