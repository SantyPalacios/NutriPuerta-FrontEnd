import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import BmiEntry from './pages/BmiEntry';
import MitosAlimentarios from './pages/MitosAlimentarios';
import Profesionales from './pages/Profesionales';
import RegistroOpcional from './pages/RegistroOpcional';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/calculator" replace />} />
          <Route path="calculator" element={<BmiEntry />} />
          <Route path="myths" element={<MitosAlimentarios />} />
          <Route path="professionals" element={<Profesionales />} />
          <Route path="contact" element={<RegistroOpcional />} />
          <Route path="*" element={<Navigate to="/calculator" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
