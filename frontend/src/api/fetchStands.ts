import { BASE_BACKEND_URL, routes } from '../routes/routes';
import { Stand } from '../types';

export const fetchStands = async (user: string): Promise<Stand[]> => {
  const response = await fetch(`${BASE_BACKEND_URL}${routes.api.stands}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${user}`,
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  if (!response.ok) {
    throw new Error(
      'Ошибка при получении списка стендов. Код ошибки: ' + response.status,
    );
  }

  const data: Stand[] = (await response.json()).stands;
  return data;
};

export default fetchStands;
