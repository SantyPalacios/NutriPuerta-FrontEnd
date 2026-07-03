import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import BmiEntry from './pages/BmiEntry';
import MitosAlimentarios from './pages/MitosAlimentarios';
import RecomendacionPersonalizada from './pages/RecomendacionPersonalizada';
import RegistroOpcional from './pages/RegistroOpcional';
import ResultadoSaludable from './pages/ResultadoSaludable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/bmi" replace />} />
          <Route path="bmi" element={<BmiEntry />} />
          <Route path="myths" element={<MitosAlimentarios />} />
          <Route path="register" element={<RegistroOpcional />} />
          <Route path="recommendation" element={<RecomendacionPersonalizada />} />
          <Route path="result" element={<ResultadoSaludable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
