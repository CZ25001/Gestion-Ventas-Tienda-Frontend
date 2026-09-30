import api from './api';

export const inventarioService = {
  getAll: async () => {
    const response = await api.get('/inventario');
const rawData = 
  response.data?.datos || 
  response.data?.data || 
  response.data;
    return Array.isArray(rawData) ? rawData : [];
  },

  create: async (inventarioData) => {
    const response = await api.post('/inventario', inventarioData);
    return response.data?.data || response.data;
  },

  update: async (id, inventarioData) => {
    const response = await api.put(`/inventario/${id}`, inventarioData);
    return response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/inventario/${id}`);
    return response.data?.data || response.data;
  }
};