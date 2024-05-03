import { BASE_BACKEND_URL, routes } from '../routes/routes';
import { Task } from '../types';

interface ApplyPluginsRequest {
    stands: number[];
    tasks: Task[];
}

// interface Service {
//     repo: string;
//     repoOwner: string;
//     branch: string;
// }

export interface ApplyPluginsResponse {
    stands: number[];   
    tasks: {
        type: string;
        // eslint-disable-next-line @typescript-eslint/ban-types
        parameters?: {};
    }[]
}

export const fetchApplyPlugins = async (user: string, standIds: number[], tasks: Task[]): Promise<ApplyPluginsResponse> => {
    const requestBody: ApplyPluginsRequest = {
        stands: standIds,
        tasks: tasks,
    };

    const response = await fetch(`${BASE_BACKEND_URL}${routes.api.applyPlugins}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${user}`,
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error('Ошибка при применении плагинов к стенду. Код ошибки: ' + response.status);
    }

    return await response.json() as ApplyPluginsResponse;
};


export default fetchApplyPlugins;
