import { FC } from 'react';
import { useState } from 'react';

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

interface Plugin {
  id: number;
  name: string;
  description: string;
}

const mock: Array<Plugin> = [
  {
    id: 1,
    name: 'deploy',
    description: 'Деплой ветки на стенде',
  },
];

const MyPlugins: FC = () => {
  const [plugins] = useState<Plugin[] | null>(mock);

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

export default MyPlugins;
