import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import EnhancedMaterialTable from '../components/Stand/Table/EnhancedMaterialTable';
import StandInfo from '../components/Stand/StandInfo';

const Stand = () => {
  const params = useParams();
  console.log(params.id);

  // TODO: если переходим на страницу стенда
  // с каким-то рандомным id вручную, пересылать на 404

  return (
    <Box>
      <StandInfo />
      <EnhancedMaterialTable />
    </Box>
  );
};

export default Stand;
