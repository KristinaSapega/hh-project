import { BASE_BACKEND_URL, routes } from '../routes/routes';

export const bookStand = (standId: string, email: string, user: string) => {
    return async (dispatch: any) => {
      try {
        const response = await fetch(`${BASE_BACKEND_URL}${routes.api.stands}${standId}`, {
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
  
        dispatch({ type: 'BOOK_STAND', payload: { standId, email } });
      } catch (error) {
        console.error('Произошла ошибка:', error);
      }
    };
  };
