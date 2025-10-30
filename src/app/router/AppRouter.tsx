import { HashRouter, Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import HomePage from '@/pages/Home';
import DetailPage from '@/pages/Detail';

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
