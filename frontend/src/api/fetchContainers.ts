import { BASE_BACKEND_URL, routes } from "../routes/routes";

interface Container {
  id: string;
  name: string;
  state: string;
}

export default async (user: string, id: number): Promise<{ containers: Container[] }> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}${routes.api.containers(id)}`, {
      headers: {
        'Authorization': `Basic ${user}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data = response.json();
    return data;
  } catch (error: unknown) {
    throw Error('error');
  }
};
