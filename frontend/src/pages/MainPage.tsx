import { FC } from "react";
import { useState } from "react";
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


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
  { field: 'Address', headerName: 'Адрес', width: 250 },
  {
    field: 'Status', headerName: 'Статус', width: 250,
    renderCell: (params: GridCellParams) => (
      <span style={{ color: params.value === 'running' ? 'green' : 'red' }}>
        {params.value ? params.value.toString() : ''}
      </span>
    )
  },
  {field: 'Status2', headerName: 'Пользователь', width: 300,
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

const rows = [
  { id: 1, Status: 'running', Name: 'Name1', Status2: ''},
  { id: 2, Status: 'stopped', Name: 'Name2', Status2: 'userAddress'},
  { id: 3, Status: 'running', Name: 'Name3', Status2: ''},
  { id: 4, Status: 'running', Name: 'Name4', Status2: ''},
  { id: 5, Status: 'running', Name: 'Name5', Status2: ''},
  { id: 6, Status: 'running', Name: 'Name6', Status2: ''},
  { id: 7, Status: 'stopped', Name: 'Name7', Status2: 'userAddress'},
  { id: 8, Status: 'running', Name: 'Name8', Status2: ''},
  { id: 9, Status: 'running', Name: 'Name9', Status2: ''},
];


const MainPage: FC  = () => {
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
        {<DataGrid
          rows={rows}
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
