import { FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AddOutlined } from '@mui/icons-material';
import { Tooltip, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';

import { fetchStands } from '../api/fetchStands';
import { useAuthContext } from '../hooks/useAuthContext';
import { Stand } from '../types';

const RenderButtonCell: FunctionComponent<{ params: GridCellParams }> = ({
  params,
}) => {
  const standId = params.row.id;

  return (
    <Link to={`/stand/${standId}`}>
      <Button
        variant="contained"
        color="success"
        sx={{
          borderRadius: '10px',
          boxShadow: 'none',
        }}
      >
        <AddOutlined />
      </Button>
    </Link>
  );
};

const RenderCell: FunctionComponent<{ params: GridCellParams }> = ({
  params,
}) => {
  const theme = useTheme();
  return (
    <span
      style={{
        color:
          params.value === 'running'
            ? theme.palette.success.main
            : theme.palette.error.main,
      }}
    >
      {params.value ? params.value.toString() : ''}
    </span>
  );
};

const columns: GridColDef[] = [
  {
    field: 'id',
    headerAlign: 'center',
    align: 'center',
    headerName: 'ID',
    width: 195,
    renderCell: (params: GridCellParams) => {
      const value = params.value as number;
      return (
        <Tooltip
          title={`Name: ${value}, 
        Option1: ${params.row.logi}, 
        Option2: ${value}, 
        Option3: ${value}, Option3: ${value}`}
        >
          <div>{value}</div>
        </Tooltip>
      );
    },
  },
  { field: 'host', headerName: 'Адрес', width: 250 },
  {
    field: 'status',
    headerName: 'Статус',
    width: 250,
    renderCell: (params: GridCellParams) => <RenderCell params={params} />,
  },
  {
    field: 'takenBy',
    headerName: 'Пользователь',
    width: 300,
    renderCell: (params: GridCellParams) => (
      <span style={{ color: params.value === '' ? 'green' : 'red' }}>
        {params.value ? params.value.toString() : ''}
      </span>
    ),
  },
  {
    field: 'Connect',
    headerName: 'Подключиться',
    align: 'center',
    headerAlign: 'center',
    width: 195,
    renderCell: (params: GridCellParams) => (
      <RenderButtonCell params={params} />
    ),
  },
];

const Stands: FunctionComponent = () => {
  const { user } = useAuthContext();
  const [stands, setStands] = useState<Stand[] | null>(null);

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
            padding: '0 10px',
          }}
        >
          <div
            style={{
              width: '100%',
            }}
          >
            <DataGrid
              rows={stands}
              columns={columns}
              disableRowSelectionOnClick
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
export default Stands;
