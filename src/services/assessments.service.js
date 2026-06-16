import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const createAssessment = async (assessment) => {
  const response = await api.post('/assessments', assessment);
  return response.data.data;
};

export const fetchAssessments = async () => {
  const response = await api.get('/assessments');
  return response.data.data;
};

export const fetchAssessmentById = async (id) => {
  const response = await api.get(`/assessments/${id}`);
  return response.data.data;
};

export const updateAssessment = async (id, updates) => {
  const response = await api.patch(`/assessments/${id}`, updates);
  return response.data.data;
};

export const deleteAssessment = async (id) => {
  const response = await api.delete(`/assessments/${id}`);
  return response.data.data;
};
