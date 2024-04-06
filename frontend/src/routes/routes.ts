const BASE_BACKEND_URL = 'http://localhost:8080';

const routes = {
  main: '/',
  login: '/login',
  stand: '/stand/:id',
  api: {
    stands: '/api/stands/',
  }
};

export { routes, BASE_BACKEND_URL };
