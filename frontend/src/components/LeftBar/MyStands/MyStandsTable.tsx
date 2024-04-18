import { FC, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RefreshOutlined, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';

import { fetchStands } from '../../../api/fetchStands';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Stand } from '../../../types';

const columns: GridColDef[] = [
  {
    field: 'host',
    headerName: 'Адрес',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'status',
    headerName: 'Статус',
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridCellParams) => (
      <span style={{ color: params.value === 'running' ? 'green' : 'red' }}>
        {params.value ? params.value.toString() : ''}
      </span>
    ),
  },
  {
    field: 'actions',
    headerName: 'Действия',
    align: 'center',
    headerAlign: 'center',
    display: 'flex',
    renderCell: () => {
      return (
        <Box
          sx={{
            '&:focus': {
              outline: 'none',
            },
          }}
        >
          <IconButton size="small" sx={{ padding: '2px' }} onClick={() => {}}>
            <RefreshOutlined />
          </IconButton>
          <IconButton size="small" sx={{ padding: '2px' }} onClick={() => {}}>
            <RemoveCircleOutline />
          </IconButton>
        </Box>
      );
    },
  },
];

const MyStandsTable: FC = () => {
  const { user } = useAuthContext();
  const [stands, setStands] = useState<Stand[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const fetchedStands: Stand[] = await fetchStands(user!);
      setStands(fetchedStands);
    })();
  }, [user]);

  return (
    <>
      {stands && (
        <div
          style={{
            padding: '0 0 10px 0',
            fontSize: '8px',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
            }}
          >
            <DataGrid
              density="compact"
              autoHeight
              disableRowSelectionOnClick
              onRowDoubleClick={() => navigate('/stand/1')}
              rows={stands}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              sx={{
                border: 0,
                userSelect: 'none',
                '&.MuiDataGrid-root .MuiDataGrid-cell, &.MuiDataGrid-root .MuiDataGrid-columnHeader':
                  {
                    outline: 'none',
                  },
                '& .css-1essi2g-MuiDataGrid-columnHeaderRow': {
                  background: 'transparent!important',
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default MyStandsTable;
