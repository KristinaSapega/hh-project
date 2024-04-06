import { BASE_BACKEND_URL, routes } from "../routes/routes";

interface Stand {
  id: number;
  host: string;
  status: string;
  takenBy: string;
}

export default async (user: string, id: number): Promise<Stand> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}${routes.api.stand(id)}`, {
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
