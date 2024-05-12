import { BASE_BACKEND_URL, routes } from '../routes/routes';

export const fetchLogs = async (standId: number, containerId: string, user: string) => {
  const response = await fetch(`${BASE_BACKEND_URL}${routes.api.logs(standId, containerId)}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${user}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      'Ошибка при загрузке логов. Код ошибки: ' + response.status,
    );
  }

  const data = await response.text();

  return data.split('\n').map((line: string) => {
    return line.slice(8);
  });
};

export default fetchLogs;
