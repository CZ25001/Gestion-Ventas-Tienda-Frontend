import { z } from 'zod';

const detalleVentaSchema = z.object({
  producto_id: z.string().min(1, 'Producto requerido'),
  nombreProducto: z.string().min(1, 'Nombre requerido'),
  cantidad: z.coerce.number().int().min(1, 'Mínimo 1'),
  precioUnitario: z.coerce.number().min(0),
  subtotal: z.coerce.number().min(0),
});

export const ventaSchema = z.object({
  empleado_id: z.string().min(1, 'Empleado requerido'),
  cliente_id: z.string().optional().or(z.literal('')),
  total: z.coerce.number().min(0),
  metodoPago: z.string().min(1, 'Método de pago requerido'),
  detalles: z.array(detalleVentaSchema).min(1, 'Debe incluir al menos un producto'),
});