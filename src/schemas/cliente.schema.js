import { z } from 'zod';

export const clienteSchema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  telefono: z.string().min(8, 'Teléfono requerido'),
  email: z.string().email('Email inválido'),
  puntosAcumulados: z.coerce.number().int().min(0, 'Debe ser mayor o igual a 0').default(0),
});