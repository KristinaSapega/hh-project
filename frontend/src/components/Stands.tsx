import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AddOutlined } from '@mui/icons-material';
import { Tooltip, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAuthContext } from '../hooks/useAuthContext';
import { takeStand } from '../reducers/standsReducer';
import { BASE_BACKEND_URL, routes } from '../routes/routes';
import { RootState } from '../store';
import { Stand } from '../types';

const RenderButtonCell: FunctionComponent<{ params: GridCellParams }> = ({
  params,
}) => {
  const standId = params.row.id;

  const dispatch = useAppDispatch();
  const { user } = useAuthContext();

  const stand = useSelector((state: RootState) => state.stands.stands).find(
    ({ id }) => id === standId,
  ) as Stand;

  const handleTakeStand = async () => {
    try {
      const response = await fetch(routes.api.stand(standId), {
        method: 'PATCH',
        headers: {
          Authorization: `Basic ${user}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ takenBy: 'admin@test.ru' }),
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      dispatch(takeStand('admin@test.ru', standId));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {!stand.takenBy && (
        <Link to={`/stand/${standId}`}>
          <Button
            variant="contained"
            color="success"
            sx={{
              borderRadius: '10px',
              boxShadow: 'none',
            }}
            onClick={handleTakeStand}
          >
            <AddOutlined />
          </Button>
        </Link>
      )}
    </>
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

const Stands: FunctionComponent<{ stands: Stand[] }> = ({ stands }) => {
  return (
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
  );
};
export default Stands;
