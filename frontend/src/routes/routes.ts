const BASE_BACKEND_URL = 'http://localhost:8080';

const routes = {
  main: '/',
  login: '/login',
  stand: '/stand/:id',
  plugin: '/dictionaries/:id', 
  api: {
    stands: '/api/stands',
    stand: (id: number) => `/api/stands/${id}`,
    plugins: `/api/dictionaries`,
    plugin: (id: number) => `/api/plugin/${id}`,
    containers: (id: number) => `/api/stands/${id}/containers`,
    container: (standId: number, id: number) =>
      `/api/stands/${standId}/containers/${id}`,
  },
};

export { routes, BASE_BACKEND_URL };
