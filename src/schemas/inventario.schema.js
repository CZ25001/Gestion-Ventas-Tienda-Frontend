import { z } from 'zod';

export const inventarioSchema = z.object({
  producto_id: z.string().min(1, 'Seleccione un producto'),
  tipoMovimiento: z.string().min(1, 'Tipo de movimiento requerido'),
  cantidad: z.coerce.number().int().min(1, 'Cantidad debe ser al menos 1'),
  motivo: z.string().min(2, 'Motivo requerido'),
});