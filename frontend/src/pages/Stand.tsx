import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Paper } from '@mui/material';

import StandInfo from '../components/Stand/StandInfo';
import StandTable from '../components/Stand/Table/StandTable';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAuthContext } from '../hooks/useAuthContext';
import { routes } from '../routes/routes';

const Stand = () => {
  const params = useParams();
  const { id } = params;

  const { user } = useAuthContext();

  let login = null;
  if (user) {
    login = user.login;
  }
  const navigate = useNavigate();

  const ownStands = useAppSelector((state) => state.stands.stands).filter(
    (stand) => stand.takenBy === login,
  );

  const isUserStand = !!ownStands.find((stand) => stand.id === Number(id));

  useEffect(() => {
    if (!user) {
      navigate(routes.login);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!isUserStand) {
      navigate(routes.main);
    }
  }, [isUserStand, navigate]);

  return (
    <Paper>
      <StandInfo id={Number(id)} />
      <StandTable id={Number(id)} />
    </Paper>
  );
};

export default Stand;
