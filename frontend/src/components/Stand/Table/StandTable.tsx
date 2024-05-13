import { FC, useEffect, useState } from 'react';

import { OpenInNew } from '@mui/icons-material';
import { Box, Link, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';

import api from '../../../api';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Container, Stand } from '../../../types';
import ElementStatus from '../../ElementStatus';

const CONTAINER_ID_MAX_SYMBOLS = 8;

const StandTable: FC<{ id: number }> = ({ id }) => {
  const [containers, setContainers] = useState<Container[]>([]);

  const { user } = useAuthContext();
  const theme = useTheme();

  const stand = useAppSelector((state) => state.stands.stands).find(
    (stand) => stand.id === id,
  ) as Stand;

  useEffect(() => {
    const header = user?.header;
    if (!header) return;
    const getStandContainer = async () => {
      const fetchedContainers = await api.fetchContainers(header, id);
      if (fetchedContainers.length !== containers.length) {
        setContainers(fetchedContainers);
      }
    };

    const interval: number = setInterval(getStandContainer, 500);

    return () => {
      clearInterval(interval);
    };
  }, [user?.header, id, containers.length]);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerAlign: 'right',
      align: 'right',
      headerName: 'ID',
      flex: 0.5,
      renderCell: (params: GridCellParams) => {
        const { id } = params.row;
        return <Box>{id.slice(0, CONTAINER_ID_MAX_SYMBOLS)}</Box>;
      },
    },
    {
      field: 'name',
      headerName: 'Имя',
      headerAlign: 'right',
      align: 'right',
      flex: 1,
    },
    {
      field: 'state',
      headerName: 'Статус',
      headerAlign: 'right',
      align: 'right',
      display: 'flex',
      flex: 1,

      renderCell: (params: GridCellParams) => {
        const { state } = params.row;
        return (
          <Box>
            {state}&nbsp;
            <ElementStatus status={state} />
          </Box>
        );
      },
    },
    {
      field: 'ports',
      headerName: 'Порты',
      headerAlign: 'right',
      align: 'right',
      display: 'flex',
      flex: 1,

      renderCell: (params: GridCellParams) => {
        const { ports } = params.row;
        const { publicPort, privatePort } = ports[0];
        return (
          <Link href={`http://${stand.host}:${publicPort}`} target="_blank">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <OpenInNew />
              <Typography>
                {publicPort}:{privatePort}
              </Typography>
            </Box>
          </Link>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Последний запуск',
      headerAlign: 'right',
      align: 'right',
      flex: 1,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" align="center" padding={2}>
        Сервисы
      </Typography>
      {containers.length ? (
        <DataGrid
          autosizeOnMount
          rows={containers}
          columns={columns}
          disableRowSelectionOnClick
          hideFooterPagination
          sx={{
            scrollbarWidth: 'none',
            overflow: 'auto',
            '&::webkit-scrollbar': {
              display: 'none',
            },
            border: 0,
            height: '100%',
            userSelect: 'none',
            '&.MuiDataGrid-root .MuiDataGrid-cell, &.MuiDataGrid-root .MuiDataGrid-columnHeader':
              {
                outline: 'none',
                backgroundColor: `${theme.palette.background.paper}!important`,
              },
            '& .MuiDataGrid-columnHeader *': {
              color: theme.palette.text.secondary,
            },
          }}
        />
      ) : (
        <Typography variant="h6" color="secondary">
          Здесь пока ничего нет
        </Typography>
      )}
    </Box>
  );
};
export default StandTable;
