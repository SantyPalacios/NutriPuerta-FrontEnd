import { useState } from 'react';
import { create } from '../services/foods.service.js';

const initialState = {
  name: '',
  category: '',
  calories: '',
  protein_g: '',
  carbs_g: '',
  fat_g: '',
};

function FoodForm({ onCreated }) {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: values.name,
        category: values.category,
        calories: Number(values.calories),
        protein_g: Number(values.protein_g),
        carbs_g: Number(values.carbs_g),
        fat_g: Number(values.fat_g),
      };

      await create(payload);
      setValues(initialState);
      if (onCreated) {
        onCreated();
      }
    } catch (err) {
      setError(err.message || 'Error al crear el alimento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'grid',
        gap: '0.75rem',
        maxWidth: '420px',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '0.75rem',
        backgroundColor: '#fafafa',
      }}
    >
      <h2 style={{ margin: 0 }}>Nuevo alimento</h2>

      <label style={{ display: 'grid', gap: '0.25rem' }}>
        Nombre
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
        />
      </label>

      <label style={{ display: 'grid', gap: '0.25rem' }}>
        Categoría
        <input
          name="category"
          value={values.category}
          onChange={handleChange}
          style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
        />
      </label>

      <label style={{ display: 'grid', gap: '0.25rem' }}>
        Calorías (kcal)
        <input
          name="calories"
          type="number"
          value={values.calories}
          onChange={handleChange}
          required
          step="1"
          style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
        />
      </label>

      <label style={{ display: 'grid', gap: '0.25rem' }}>
        Proteínas (g)
        <input
          name="protein_g"
          type="number"
          value={values.protein_g}
          onChange={handleChange}
          required
          step="0.1"
          style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
        />
      </label>

      <label style={{ display: 'grid', gap: '0.25rem' }}>
        Carbohidratos (g)
        <input
          name="carbs_g"
          type="number"
          value={values.carbs_g}
          onChange={handleChange}
          required
          step="0.1"
          style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
        />
      </label>

      <label style={{ display: 'grid', gap: '0.25rem' }}>
        Grasas (g)
        <input
          name="fat_g"
          type="number"
          value={values.fat_g}
          onChange={handleChange}
          required
          step="0.1"
          style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
        />
      </label>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '0.75rem',
          borderRadius: '0.75rem',
          border: 'none',
          backgroundColor: '#2563eb',
          color: '#fff',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        {loading ? 'Guardando...' : 'Guardar alimento'}
      </button>
    </form>
  );
}

export default FoodForm;
