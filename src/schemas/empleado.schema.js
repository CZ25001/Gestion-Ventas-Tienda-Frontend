import { z } from 'zod';

export const empleadoSchema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  rol: z.enum(['CAJERO', 'ADMINISTRADOR', 'INVENTARIADOR']),
  salario: z.coerce.number().min(0, 'Salario debe ser mayor o igual a 0'),
  activo: z.boolean().default(true),
});