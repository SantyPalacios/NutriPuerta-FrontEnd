import { useState } from 'react';
import NutritionCalculator from './components/NutritionCalculator.jsx';
import AssessmentList from './components/AssessmentList.jsx';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
        <header>
          <h1>NutriPuerta</h1>
          <p>App de cálculo de IMC y requerimiento energético diario.</p>
        </header>

        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
          <NutritionCalculator onCreated={handleCreated} />
          <div>
            <h2>Evaluaciones</h2>
            <AssessmentList reloadKey={refreshKey} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
