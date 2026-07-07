import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
});

export const getAll = async () => {
  const response = await api.get('/foods');
  return response.data.data;
};

export const getById = async (id) => {
  const response = await api.get(`/foods/${id}`);
  return response.data.data;
};

export const create = async (food) => {
  const response = await api.post('/foods', food);
  return response.data.data;
};

export const update = async (id, updates) => {
  const response = await api.patch(`/foods/${id}`, updates);
  return response.data.data;
};

export const remove = async (id) => {
  const response = await api.delete(`/foods/${id}`);
  return response.data.data;
};
