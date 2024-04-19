import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RefreshOutlined, RemoveCircleOutline } from '@mui/icons-material';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { IconButton } from '@mui/material';

import { routes } from '../../../routes/routes';
import { Stand } from '../../../types';
import ElementStatus from '../../ElementStatus';

const MyStandsTable: FunctionComponent<{
  stands: Stand[];
}> = ({ stands }) => {
  const navigate = useNavigate();

  const theme = useTheme();

  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <>
      {stands && (
        <TableContainer>
          <Table
            size="small"
            sx={{
              tableLayout: 'fixed',
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
              {stands.map((stand) => (
                <TableRow
                  sx={{
                    backgroundColor:
                      stand.id === selectedRow
                        ? theme.palette.primary.main
                        : 'transparent',
                  }}
                  onClick={() => {
                    setSelectedRow(stand.id);
                  }}
                  onDoubleClick={() => {
                    navigate(routes.stand.replace(':id', stand.id.toString()));
                  }}
                  key={stand.id}
                  data-id={stand.id}
                >
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
                  <TableCell align="center">
                    <Box
                      sx={{
                        '&:focus': {
                          outline: 'none',
                        },
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{ padding: '2px' }}
                        onClick={() => {}}
                      >
                        <RefreshOutlined />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ padding: '2px' }}
                        onClick={() => {}}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
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
