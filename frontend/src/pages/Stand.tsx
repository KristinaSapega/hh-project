import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import StandInfo from '../components/Stand/StandInfo';
import StandTable from '../components/Stand/Table/StandTable';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAuthContext } from '../hooks/useAuthContext';
import { routes } from '../routes/routes';

const Stand = () => {
  const params = useParams();
  const { id } = params;

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const ownStands = useAppSelector((state) => state.stands.stands).filter(
    (stand) => stand.takenBy === atob(user!).split(':')[0],
  );

  const isUserStand = !!ownStands.find((stand) => stand.id === Number(id));

  useEffect(() => {
    if (!isUserStand) {
      navigate(routes.main);
    }
  }, [isUserStand, navigate]);

  return (
    <Box>
      <StandInfo id={Number(id)} />
      <StandTable id={Number(id)} />
    </Box>
  );
};

export default Stand;
