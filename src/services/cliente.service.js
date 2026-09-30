import api from './api';

export const clienteService = {
  getAll: async () => {
    // Hace la petición a través de api.js (mantiene cookies y tokens)
    const response = await api.get('/clientes');
    // Desestructuramos el arreglo { ok: true, data: [...] }
    const rawData = response.data?.data || response.data?.clientes || response.data;
    return Array.isArray(rawData) ? rawData : [];
  },

  create: async (clienteData) => {
    const response = await api.post('/clientes', clienteData);
    return response.data?.data || response.data;
  },

  update: async (id, clienteData) => {
    const response = await api.put(`/clientes/${id}`, clienteData);
    return response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/clientes/${id}`);
    return response.data?.data || response.data;
  }
};