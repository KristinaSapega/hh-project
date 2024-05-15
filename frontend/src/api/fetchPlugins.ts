import { BASE_BACKEND_URL, routes } from '../routes/routes';
import { Plugin } from '../types';

export const fetchPlugins = async (user: string): Promise<Plugin[]> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}${routes.api.plugins}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${user}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw new Error(
        'Ошибка при получении списка плагинов. Код ошибки: ' + response.status,
      );
    }

    const data: Plugin[] = (await response.json()).taskTemplates;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('Ошибка сети при запросе плагинов');
    }
    if (error instanceof Error) {
      throw Error(error.message);
    }
    throw Error('Ошибка при запросе плагинов');
  }
};

export default fetchPlugins;
