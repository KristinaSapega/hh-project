import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import StandTable from '../components/Stand/Table/StandTable';
import StandInfo from '../components/Stand/StandInfo';

const Stand = () => {
  const params = useParams();
  const { id } = params;

  // TODO: если переходим на страницу стенда
  // с каким-то рандомным id вручную, пересылать на 404

  return (
    <Box>
      <StandInfo id={Number(id)} />
      <StandTable id={Number(id)} />
    </Box>
  );
};

export default Stand;
