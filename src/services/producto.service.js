import api from './api';

export const productoService = {
  getAll: async () => {
    const response = await api.get('/productos');
const rawData = 
  response.data?.datos || 
  response.data?.data || 
  response.data;
    return Array.isArray(rawData) ? rawData : [];
  },

  create: async (productoData) => {
    const response = await api.post('/productos', productoData);
    return response.data?.data || response.data;
  },

  update: async (id, productoData) => {
    const response = await api.put(`/productos/${id}`, productoData);
    return response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data?.data || response.data;
  }
};