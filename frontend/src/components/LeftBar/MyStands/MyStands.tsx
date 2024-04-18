import { FunctionComponent } from 'react';

import MyStandsTable from './MyStandsTable';
import { Stand } from '../../../types';

const stands: Stand[] = [
  {
    id: 1,
    host: 'Host1',
    status: 'running',
    takenBy: 'user1',
  },
  {
    id: 2,
    host: 'Host2',
    status: 'running',
    takenBy: 'user2',
  },
  {
    id: 3,
    host: 'Host3',
    status: 'stopped',
    takenBy: 'user3',
  },
];

const MyStands: FunctionComponent = () => {
  return <MyStandsTable
    stands={stands}
  />;
};

export default MyStands;
