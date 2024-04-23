import { BASE_BACKEND_URL, routes } from '../routes/routes';

export const fetchReleaseStand = (standId: number, user: string) => {
    return async (dispatch: any) => {
        try {
            const response = await fetch(`${BASE_BACKEND_URL}${routes.api.stands}${standId}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Basic ${user}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ takenBy: null }) 
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке PATCH-запроса');
            }

            dispatch({ type: 'RELEASE_STAND', payload: { standId } });
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };
};

