import { FC, useState } from 'react';

import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { RootState } from '../../../store';

const menuItemStyles = {
  fontSize: '12px',
};

const StandsList: FC = () => {
  const { user } = useAuthContext();
  const [selectedStand, setSelectedStand] = useState<string | null>(null);

  let login = null;
  if (user) {
    login = user.login;
  }

  const ownStands = useAppSelector(
    (state: RootState) => state.stands.stands,
  ).filter((stand) => stand.takenBy === login);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStand(event.target.value as string);
  };

  return (
    <FormControl fullWidth size="small" sx={{ p: '10px', height: '50px' }}>
      <Select
        displayEmpty
        value={selectedStand ? selectedStand : ''}
        onChange={handleChange}
        disabled={!ownStands.length}
        sx={{
          maxWidth: '100%',
          overflow: 'hidden',
          fontSize: '12px',
        }}
      >
        <MenuItem disabled value="" sx={{ ...menuItemStyles, display: 'none' }}>
          Выберите стенд
        </MenuItem>
        {ownStands.map((stand) => (
          <MenuItem key={stand.id} value={stand.id} sx={{ ...menuItemStyles }}>
            {stand.host}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StandsList;
