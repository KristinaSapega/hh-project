import { FC } from 'react';
import { useSelector } from 'react-redux';

import { LoginOutlined, LogoutOutlined } from '@mui/icons-material';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAuthContext } from '../hooks/useAuthContext';
import { RootState } from '../store';
import { apiLeaveStand, apiTakeStand } from '../store/stands';
import { Stand } from '../types';

const RenderButtonCell: FC<{ params: GridCellParams; onClose: () => void }> = ({
  params,
  onClose,
}) => {
  const { user } = useAuthContext();
  const login = atob(user!).split(':')[0];

  const standId = params.row.id;

  const dispatch = useAppDispatch();

  const stand = useSelector((state: RootState) => state.stands.stands).find(
    ({ id }) => id === standId,
  ) as Stand;

  const handleTakeStand = (id: number) => () => {
    dispatch(apiTakeStand(id));
    onClose();
  };

  const handleLeaveStand = (id: number) => () => {
    dispatch(apiLeaveStand(id));
    onClose();
  };

  return (
    <>
      {!stand.takenBy ? (
        <IconButton
          sx={{
            borderRadius: '10px',
            boxShadow: 'none',
          }}
          onClick={handleTakeStand(standId)}
        >
          <LoginOutlined />
        </IconButton>
      ) : (
        stand.takenBy === login && (
          <IconButton
            sx={{
              borderRadius: '10px',
              boxShadow: 'none',
            }}
            onClick={handleLeaveStand(standId)}
          >
            <LogoutOutlined />
          </IconButton>
        )
      )}
    </>
  );
};

const RenderCell: FC<{ params: GridCellParams }> = ({ params }) => {
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

const Stands: FC<{ stands: Stand[]; onClose: () => void }> = ({
  stands,
  onClose,
}) => {
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
        <RenderButtonCell params={params} onClose={onClose} />
      ),
    },
  ];

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
            // сортировка по первому столбцу по возрастанию
            sorting: {
              sortModel: [
                {
                  field: 'id',
                  sort: 'asc',
                },
              ],
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
