import { FC, useEffect } from "react";
import { useState } from "react";
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { fetchStands } from '../api/fetchStands';
import { Stands } from '../api/fetchStands';
import { useAuthContext } from "../hooks/useAuthContext";




const columns: GridColDef[] = [
  {
    field: 'checkbox',
    headerName: '',
    width: 100,
    renderCell: (params: GridCellParams) => {
      const isDisabled = params.row.Status !== 'running';
      const [checked, setChecked] = useState(false);
      const handleChange = () => {
        if (isDisabled) return;
        setChecked(!checked);
      };
      const checkboxStyle = isDisabled ? { backgroundColor: 'darkgray' } : {};
      return (
        <input type="checkbox" disabled={isDisabled} checked={checked} onChange={handleChange} style={checkboxStyle} />
      );
    }
  },

  {
    field: 'id',
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
    }
  },
  //   { field: 'Name', headerName: 'Имя', width: 195 },
  { field: 'host', headerName: 'Адрес', width: 250 },
  {
    field: 'status', headerName: 'Статус', width: 250,
    renderCell: (params: GridCellParams) => (
      <span style={{ color: params.value === 'running' ? 'green' : 'red' }}>
        {params.value ? params.value.toString() : ''}
      </span>
    )
  },
  {
    field: 'takenBy', headerName: 'Пользователь', width: 300,
    renderCell: (params: GridCellParams) => (
      <span style={{ color: params.value === '' ? 'green' : 'red' }}>
        {params.value ? params.value.toString() : ''}
      </span>
    )
  },
  {
    field: 'Connect',
    headerName: 'Подключиться',
    width: 195,
    renderCell: (params: GridCellParams) => {
      const theme = useTheme();
      const buttonColor = theme.palette.mode === 'light' ? 'white' : 'black';
      const standId = params.row.id;

      return (
        <Link to={`/stand/${standId}`}>
          <Button
            style={{
              backgroundColor: buttonColor,
              color: theme.palette.mode === 'light' ? 'black' : 'white',
              borderRadius: '10px',
              border: '1px solid lightgrey',
              width: '120px',
              height: '36px',
            }}
          >
            Connect
          </Button>
        </Link>
      );
    },
  },

];


const MainPage: FC = () => {
  const { user } = useAuthContext();
  const [, setAnchorEl] = useState<null | HTMLElement>(null);
  const [standMenuAnchorEl, setStandMenuAnchorEl] = useState<null | HTMLElement>(null);


  const handleAddStandClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStandMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setStandMenuAnchorEl(null);
  };

  const theme = useTheme();

  const [stands, setStands] = useState<Stands[] | null>(null);
  useEffect(() => {
    (async () => {
      const fetchedStands: Stands[] = await fetchStands(user!);
      setStands(fetchedStands);
    })();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '90px' }}>
        <h1 style={{ fontFamily: 'monospace, Responsive, Arial, sans-serif' }}>Список стендов</h1>
        <Button
          aria-controls="add-stand-menu"
          aria-haspopup="true"
          onClick={handleAddStandClick}
          style={{
            backgroundColor: theme.palette.mode === 'light' ? 'white' : theme.palette.background.paper,
            color: 'grey',
            borderRadius: '10px',
            border: '1px solid lightgrey',
            width: '190px',
            height: '40px',
            margin: '0 30px'
          }}
        >
          Добавить стенд
        </Button>
        <Menu
          anchorEl={standMenuAnchorEl}
          open={Boolean(standMenuAnchorEl)}
          onClose={handleClose}
          id="add-stand-menu"
        >
          <MenuItem>Стенд 1 - IP: 000.000.0.0</MenuItem>
          <MenuItem>Стенд 2 - IP: 000.000.1.1</MenuItem>
        </Menu>
      </div>
      <div style={{ height: '600px', width: '100%', overflow: '', paddingTop: '10px', paddingBottom: '200px' }}>
        {stands && <DataGrid
          rows={stands}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}

        />}
      </div>

    </div>
  );
}
export default MainPage;
