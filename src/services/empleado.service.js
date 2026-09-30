import api from './api';

export const empleadoService = {
  getAll: async () => {
    const response = await api.get('/empleados');
    // Agregamos response.data?.datos al inicio
   const rawData = 
  response.data?.datos || 
  response.data?.data || 
  response.data;
    return Array.isArray(rawData) ? rawData : [];
  },

  create: async (empleadoData) => {
    const response = await api.post('/empleados', empleadoData);
    return response.data?.datos || response.data?.data || response.data;
  },

  update: async (id, empleadoData) => {
    const response = await api.put(`/empleados/${id}`, empleadoData);
    return response.data?.datos || response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/empleados/${id}`);
    return response.data?.datos || response.data?.data || response.data;
  }
};