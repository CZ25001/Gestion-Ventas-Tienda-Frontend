import { z } from 'zod';

export const proveedorSchema = z.object({
  empresa: z.string().min(2, 'Empresa requerida'),
  contactoNombre: z.string().min(2, 'Nombre de contacto requerido'),
  telefono: z.string().min(8, 'Teléfono requerido'),
  direccion: z.string().min(3, 'Dirección requerida'),
  categoriasSurtidas: z.array(z.string()).min(1, 'Agregue al menos una categoría'),
});