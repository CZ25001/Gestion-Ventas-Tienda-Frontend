import api from './api';

export const ventaService = {
  getAll: async () => {
    const response = await api.get('/ventas');
const rawData = 
  response.data?.datos || 
  response.data?.data || 
  response.data;
    return Array.isArray(rawData) ? rawData : [];
  },

  create: async (ventaData) => {
    const response = await api.post('/ventas', ventaData);
    return response.data?.data || response.data;
  },

  update: async (id, ventaData) => {
    const response = await api.put(`/ventas/${id}`, ventaData);
    return response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/ventas/${id}`);
    return response.data?.data || response.data;
  }
};