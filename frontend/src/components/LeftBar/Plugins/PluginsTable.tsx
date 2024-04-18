import { FunctionComponent } from 'react';

import { CallToActionOutlined } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IconButton } from '@mui/material';

import { Plugin } from '../../../types';

const PluginsTable: FunctionComponent<{
  plugins: Plugin[];
}> = ({ plugins }) => {
  return (
    <>
      {plugins && (
        <TableContainer>
          <Table
            size="small"
            sx={{
              tableLayout: 'fixed',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Название</TableCell>
                <TableCell align="center">Описание</TableCell>
                <TableCell align="center">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              onDoubleClick={() => {
                console.log('1');
              }}
            >
              {plugins.map((plugin) => (
                <TableRow key={plugin.id}>
                  <TableCell align="center">{plugin.name}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {plugin.description}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      sx={{ padding: '2px' }}
                      onClick={() => {}}
                    >
                      <CallToActionOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default PluginsTable;
