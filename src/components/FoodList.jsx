import { useEffect, useState } from 'react';
import { getAll } from '../services/foods.service.js';

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFoods = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAll();
        setFoods(data || []);
      } catch (err) {
        setError(err.message || 'Error al cargar los alimentos');
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, []);

  if (loading) {
    return <p>Cargando alimentos...</p>;
  }

  if (error) {
    return <p style={{ color: 'crimson' }}>{error}</p>;
  }

  if (foods.length === 0) {
    return <p>No hay alimentos registrados.</p>;
  }

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {foods.map((food) => (
        <div
          key={food.id || food._id || food.name}
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <strong>{food.name}</strong>
            <span style={{ color: '#555' }}>{food.category || 'Sin categoría'}</span>
          </div>

          <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.35rem' }}>
            <div>Calorías: {food.calories || food.calories_kcal || 0} kcal</div>
            <div>Proteínas: {food.protein_g ?? 0} g</div>
            <div>Carbohidratos: {food.carbs_g ?? 0} g</div>
            <div>Grasas: {food.fat_g ?? 0} g</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodList;
