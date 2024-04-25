import { BASE_BACKEND_URL, routes } from '../routes/routes';

export const fetchBookStand = async (standId: number, email: string, user: string) => {
    const response = await fetch(`${BASE_BACKEND_URL}${routes.api.stands}/${standId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Basic ${user}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ takenBy: email })
    });

    if (!response.ok) {
        throw new Error('Ошибка при отправке PATCH-запроса');
    }

    return { standId, email };
};
