import { Dispatch, FunctionComponent, SetStateAction } from 'react';

import { Toolbar, alpha, Typography } from '@mui/material';

import { Data } from './StandTable';

interface EnhancedTableToolbarProps {
  numSelected: number;
  setRows: Dispatch<SetStateAction<Data[]>>;
}

const EnhancedTableToolbar: FunctionComponent<EnhancedTableToolbarProps> = ({
  numSelected,
}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Сервисы
        </Typography>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
