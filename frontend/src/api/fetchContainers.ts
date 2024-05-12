import { BASE_BACKEND_URL, routes } from '../routes/routes';
import { Container } from '../types';

export default async (user: string, id: number) => {
  try {
    const response = await fetch(
      `${BASE_BACKEND_URL}${routes.api.containers(id)}`,
      {
        headers: {
          Authorization: `Basic ${user}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      },
    );

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data = await response.json();
    return data.containers as Container[];
  } catch (error: unknown) {
    throw Error('error');
  }
};
