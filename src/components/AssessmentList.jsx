import { useEffect, useState } from 'react';
import { fetchAssessments as getAll } from '../services/assessments.service.js';

const categoryStyle = (category) => {
  const base = {
    padding: '0.25rem 0.5rem',
    borderRadius: '0.5rem',
    display: 'inline-block',
    fontWeight: 600,
  };

  if (category === 'normal') {
    return { ...base, backgroundColor: '#daf5d8', color: '#1d6b2f' };
  }

  return { ...base, backgroundColor: '#fff2d8', color: '#b15a0b' };
};

function AssessmentList({ reloadKey }) {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAll();
        setAssessments(data || []);
      } catch (err) {
        setError(err.message || 'Error al cargar evaluaciones');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [reloadKey]);

  if (loading) {
    return <p>Cargando evaluaciones...</p>;
  }

  if (error) {
    return <p style={{ color: 'crimson' }}>{error}</p>;
  }

  if (assessments.length === 0) {
    return <p>No hay evaluaciones registradas.</p>;
  }

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {assessments.map((assessment) => (
        <div
          key={assessment.id || assessment._id || assessment.created_at}
          style={{
            border: '1px solid #ddd',
            borderRadius: '0.75rem',
            padding: '1rem',
            backgroundColor: '#fff',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ color: '#555' }}>
              Fecha: {new Date(assessment.created_at).toLocaleString()}
            </span>
            <span style={categoryStyle(assessment.imc_category)}>
              {assessment.imc_category}
            </span>
          </div>

          <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.5rem' }}>
            <div>IMC: {assessment.imc}</div>
            <div>Requerimiento energético: {assessment.red_kcal} kcal</div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div>Proteínas: {assessment.protein_g} g</div>
              <div>Carbohidratos: {assessment.carbs_g} g</div>
              <div>Grasas: {assessment.fat_g} g</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AssessmentList;
