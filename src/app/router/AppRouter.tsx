import HomePage from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import { HashRouter, Route, Routes } from 'react-router-dom';

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
