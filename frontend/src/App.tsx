import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { routes } from './routes/routes';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={routes.main} element={<></>} />
          <Route path={routes.login} element={<></>} />
          <Route path={routes.stand} element={<></>} />
          <Route path="*" element={<></>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
