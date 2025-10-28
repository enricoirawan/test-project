import { HashRouter, Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home/Home';

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
