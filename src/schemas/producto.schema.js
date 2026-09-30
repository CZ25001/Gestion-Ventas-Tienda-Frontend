import { z } from 'zod';

export const productoSchema = z.object({
  codigoBarras: z.string().min(1, 'Código de barras requerido'),
  nombre: z.string().min(2, 'Nombre requerido'),
  precioVenta: z.coerce.number().min(0, 'El precio debe ser positivo'),
  proveedor_id: z.string().min(1, 'Seleccione un proveedor'),
  especificaciones: z.object({
    categoria: z.string().min(1, 'Categoría requerida'),
    unidadMedida: z.string().min(1, 'Unidad de medida requerida'),
    marca: z.string().min(1, 'Marca requerida'),
    fechaExpiracion: z.string().optional().or(z.literal('')),
  }),
});