import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box, Typography } from '@mui/material';
import { productoSchema } from '../../schemas/producto.schema';
import { proveedorService } from '../../services/proveedor.service';

export default function ProductoDialog({ open, onClose, onSave, producto }) {
  const [proveedores, setProveedores] = useState([]);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      codigoBarras: '',
      nombre: '',
      precioVenta: 0,
      proveedor_id: '',
      especificaciones: { categoria: '', unidadMedida: '', marca: '', fechaExpiracion: '' }
    }
  });

  useEffect(() => {
    if (open) {
      proveedorService.getAll().then(setProveedores).catch(console.error);
    }
  }, [open]);

  useEffect(() => {
    if (producto) {
      setValue('codigoBarras', producto.codigoBarras);
      setValue('nombre', producto.nombre);
      setValue('precioVenta', producto.precioVenta);
      setValue('proveedor_id', producto.proveedor_id?._id || producto.proveedor_id);
      setValue('especificaciones.categoria', producto.especificaciones?.categoria || '');
      setValue('especificaciones.unidadMedida', producto.especificaciones?.unidadMedida || '');
      setValue('especificaciones.marca', producto.especificaciones?.marca || '');
      setValue('especificaciones.fechaExpiracion', producto.especificaciones?.fechaExpiracion ? producto.especificaciones.fechaExpiracion.split('T')[0] : '');
    } else {
      reset({
        codigoBarras: '', nombre: '', precioVenta: 0, proveedor_id: '',
        especificaciones: { categoria: '', unidadMedida: '', marca: '', fechaExpiracion: '' }
      });
    }
  }, [producto, open, setValue, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{producto ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSave)}>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Código de Barras" {...register('codigoBarras')} error={!!errors.codigoBarras} helperText={errors.codigoBarras?.message} />
          <TextField fullWidth margin="normal" label="Nombre" {...register('nombre')} error={!!errors.nombre} helperText={errors.nombre?.message} />
          <TextField fullWidth margin="normal" label="Precio de Venta" type="number" {...register('precioVenta')} error={!!errors.precioVenta} helperText={errors.precioVenta?.message} />
          
          <TextField select fullWidth margin="normal" label="Proveedor" defaultValue="" {...register('proveedor_id')} error={!!errors.proveedor_id} helperText={errors.proveedor_id?.message}>
            {proveedores.map((p) => (
              <MenuItem key={p._id || p.id} value={p._id || p.id}>{p.empresa}</MenuItem>
            ))}
          </TextField>

          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }} fontWeight="bold">Especificaciones del Producto</Typography>
          <TextField fullWidth margin="normal" label="Categoría" {...register('especificaciones.categoria')} error={!!errors.especificaciones?.categoria} helperText={errors.especificaciones?.categoria?.message} />
          <TextField fullWidth margin="normal" label="Unidad de Medida" {...register('especificaciones.unidadMedida')} error={!!errors.especificaciones?.unidadMedida} helperText={errors.especificaciones?.unidadMedida?.message} />
          <TextField fullWidth margin="normal" label="Marca" {...register('especificaciones.marca')} error={!!errors.especificaciones?.marca} helperText={errors.especificaciones?.marca?.message} />
          <TextField fullWidth margin="normal" label="Fecha de Expiración" type="date" InputLabelProps={{ shrink: true }} {...register('especificaciones.fechaExpiracion')} error={!!errors.especificaciones?.fechaExpiracion} helperText={errors.especificaciones?.fechaExpiracion?.message} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}