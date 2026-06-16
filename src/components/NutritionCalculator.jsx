import { useState } from 'react';
import { createAssessment } from '../services/assessments.service.js';

function NutritionCalculator({ onCreated }) {
  const [step, setStep] = useState('measure'); // 'measure' | 'details' | 'results' | 'non-normal'
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [imc, setImc] = useState(null);
  const [imcCategory, setImcCategory] = useState('');

  const [age, setAge] = useState('');
  const [sex, setSex] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');

  const [redKcal, setRedKcal] = useState(null);
  const [carbsRange, setCarbsRange] = useState(null);
  const [proteinRange, setProteinRange] = useState(null);
  const [fatRange, setFatRange] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categoryFromImc = (value) => {
    if (value < 18.5) return 'underweight';
    if (value >= 18.5 && value <= 24.9) return 'normal';
    if (value >= 25 && value <= 29.9) return 'overweight';
    return 'obese';
  };

  const handleMeasureSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const w = Number(weight);
    const hCm = Number(height);
    if (!w || !hCm) {
      setError('Peso y altura válidos son requeridos');
      return;
    }

    const hM = hCm / 100;
    const calcImc = Number((w / (hM * hM)).toFixed(2));
    const category = categoryFromImc(calcImc);

    setImc(calcImc);
    setImcCategory(category);

    if (category === 'normal') {
      setStep('details');
    } else {
      setStep('non-normal');
    }
  };

  const factoresActividad = {
    sedentary: 1.3,
    light: 1.5,
    active: 1.75,
    very_active: 2,
  };

  const rangos = {
    carbs: { min: 0.45, max: 0.65, kcalPerGram: 4 },
    protein: { min: 0.10, max: 0.35, kcalPerGram: 4 },
    fat: { min: 0.20, max: 0.35, kcalPerGram: 9 },
  };

  function calcularRangoGramos(red, rango) {
    const min = Math.round((red * rango.min) / rango.kcalPerGram);
    const max = Math.round((red * rango.max) / rango.kcalPerGram);
    return { min, max };
  }

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const a = Number(age);
    const w = Number(weight);
    const hCm = Number(height);
    if (!a || !w || !hCm) {
      setError('Edad, peso y altura válidos son requeridos');
      return;
    }

    const bmr = sex === 'male'
      ? 10 * w + 6.25 * hCm - 5 * a + 5
      : 10 * w + 6.25 * hCm - 5 * a - 161;

    const red = Math.round(bmr * factoresActividad[activityLevel]);

    const carbs = calcularRangoGramos(red, rangos.carbs);
    const protein = calcularRangoGramos(red, rangos.protein);
    const fat = calcularRangoGramos(red, rangos.fat);

    setRedKcal(red);
    setCarbsRange(carbs);
    setProteinRange(protein);
    setFatRange(fat);

    setStep('results');
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const protein_g = Math.round((proteinRange.min + proteinRange.max) / 2);
      const carbs_g = Math.round((carbsRange.min + carbsRange.max) / 2);
      const fat_g = Math.round((fatRange.min + fatRange.max) / 2);

      const payload = {
        user_id: 'user-123',
        profile_snapshot: {
          age: Number(age),
          sex,
          weight_kg: Number(weight),
          height_cm: Number(height),
          activity_level: activityLevel,
        },
        imc,
        imc_category: imcCategory,
        red_kcal: redKcal,
        protein_g,
        carbs_g,
        fat_g,
      };

      await createAssessment(payload);
      setLoading(false);
      // reset form
      setWeight('');
      setHeight('');
      setAge('');
      setSex('male');
      setActivityLevel('sedentary');
      setImc(null);
      setImcCategory('');
      setRedKcal(null);
      setCarbsRange(null);
      setProteinRange(null);
      setFatRange(null);
      setStep('measure');

      if (onCreated) onCreated();
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error al guardar la evaluación');
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '0.75rem', backgroundColor: '#fafafa' }}>
      {step === 'measure' && (
        <form onSubmit={handleMeasureSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
          <h2 style={{ margin: 0 }}>Calculadora nutricional</h2>

          <label style={{ display: 'grid', gap: '0.25rem' }}>
            Peso (kg)
            <input
              name="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              step="0.1"
              style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
            />
          </label>

          <label style={{ display: 'grid', gap: '0.25rem' }}>
            Altura (cm)
            <input
              name="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              step="0.1"
              style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
            />
          </label>

          {error && <p style={{ color: 'crimson' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', backgroundColor: '#2563eb', color: '#fff', border: 'none' }}>
              Calcular IMC
            </button>
          </div>
        </form>
      )}

      {step === 'non-normal' && (
        <div>
          <h3 style={{ marginTop: 0 }}>Resultado: {imc} ({imcCategory})</h3>
          <p>Entiendo — tu IMC está fuera del rango "normal". El cálculo automático puede no reflejar tu composición corporal exacta.</p>

          <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #e6e6e6', borderRadius: '0.5rem', backgroundColor: '#fff' }}>
            <h4>Cómo prepararte para tu primera consulta</h4>
            <ul>
              <li>Lleva un registro de tu peso y hábitos alimentarios.</li>
              <li>Trae resultados de análisis recientes si los tienes.</li>
              <li>Anota tus objetivos y preguntas.</li>
            </ul>
            <button onClick={() => window.alert('Funcionalidad de búsqueda no implementada aún')} style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', backgroundColor: '#f59e0b', color: '#fff', border: 'none' }}>
              Buscar un nutricionista
            </button>
          </div>

          <div style={{ marginTop: '0.75rem' }}>
            <button onClick={() => setStep('measure')} style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc', background: 'transparent' }}>Volver</button>
          </div>
        </div>
      )}

      {step === 'details' && (
        <form onSubmit={handleDetailsSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
          <h3 style={{ margin: 0 }}>IMC: {imc} — Categoría: {imcCategory}</h3>
          <p style={{ marginTop: 0 }}>Estás en rango saludable. Completa algunos datos para calcular tus necesidades energéticas.</p>

          <label style={{ display: 'grid', gap: '0.25rem' }}>
            Edad
            <input name="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }} />
          </label>

          <label style={{ display: 'grid', gap: '0.25rem' }}>
            Sexo
            <select name="sex" value={sex} onChange={(e) => setSex(e.target.value)} style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
          </label>

          <label style={{ display: 'grid', gap: '0.25rem' }}>
            Nivel de actividad
            <select name="activity" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}>
              <option value="sedentary">Sedentario</option>
              <option value="light">Ligero</option>
              <option value="active">Activo</option>
              <option value="very_active">Muy activo</option>
            </select>
          </label>

          {error && <p style={{ color: 'crimson' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', backgroundColor: '#2563eb', color: '#fff', border: 'none' }}>
              Calcular requerimiento
            </button>
            <button type="button" onClick={() => setStep('measure')} style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc', background: 'transparent' }}>
              Volver
            </button>
          </div>
        </form>
      )}

      {step === 'results' && (
        <div>
          <h3>Resultado nutricional</h3>
          <p>RED: {redKcal} kcal</p>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div>Carbohidratos: {carbsRange.min} g - {carbsRange.max} g</div>
            <div>Proteínas: {proteinRange.min} g - {proteinRange.max} g</div>
            <div>Grasas: {fatRange.min} g - {fatRange.max} g</div>
          </div>

          {error && <p style={{ color: 'crimson' }}>{error}</p>}

          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleSave} disabled={loading} style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', backgroundColor: '#16a34a', color: '#fff', border: 'none' }}>
              {loading ? 'Guardando...' : 'Guardar evaluación'}
            </button>
            <button onClick={() => setStep('measure')} style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc', background: 'transparent' }}>
              Nueva medición
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NutritionCalculator;
