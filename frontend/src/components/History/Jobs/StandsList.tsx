import { FC, useState } from 'react';

import { Box, Button, Menu, MenuItem } from '@mui/material';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { RootState } from '../../../store';

const StandsList: FC = () => {
  const { user } = useAuthContext();
  let login = null;
  if (user) {
    login = user.login;
  }

  const ownStands = useAppSelector(
    (state: RootState) => state.stands.stands,
  ).filter((stand) => stand.takenBy === login);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        size='small'
        color='inherit'
        onClick={handleClick}
      >
        Выберите стенд
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {ownStands.map((stand) => {
          const { id, host } = stand;
          return (
            <MenuItem key={id} onClick={handleClose}>
              {host}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default StandsList;
