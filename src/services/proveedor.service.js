import api from './api';

export const proveedorService = {
  getAll: async () => {
    const response = await api.get('/proveedores');
  const rawData = 
  response.data?.datos || 
  response.data?.data || 
  response.data;
    return Array.isArray(rawData) ? rawData : [];
  },

  create: async (proveedorData) => {
    const response = await api.post('/proveedores', proveedorData);
    return response.data?.data || response.data;
  },

  update: async (id, proveedorData) => {
    const response = await api.put(`/proveedores/${id}`, proveedorData);
    return response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/proveedores/${id}`);
    return response.data?.data || response.data;
  }
};