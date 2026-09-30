import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material';
import { inventarioSchema } from '../../schemas/inventario.schema';
import { productoService } from '../../services/producto.service';

export default function InventarioDialog({ open, onClose, onSave, inventario }) {
  const [productos, setProductos] = useState([]);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(inventarioSchema),
    defaultValues: { producto_id: '', tipoMovimiento: 'ENTRADA', cantidad: 1, motivo: '' }
  });

  useEffect(() => {
    if (open) {
      productoService.getAll().then(setProductos).catch(console.error);
    }
  }, [open]);

  useEffect(() => {
    if (inventario) {
      setValue('producto_id', inventario.producto_id?._id || inventario.producto_id);
      setValue('tipoMovimiento', inventario.tipoMovimiento);
      setValue('cantidad', inventario.cantidad);
      setValue('motivo', inventario.motivo);
    } else {
      reset({ producto_id: '', tipoMovimiento: 'ENTRADA', cantidad: 1, motivo: '' });
    }
  }, [inventario, open, setValue, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{inventario ? 'Editar Movimiento' : 'Nuevo Movimiento de Inventario'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSave)}>
        <DialogContent>
          <TextField select fullWidth margin="normal" label="Producto" defaultValue="" {...register('producto_id')} error={!!errors.producto_id} helperText={errors.producto_id?.message}>
            {productos.map((p) => (
              <MenuItem key={p._id || p.id} value={p._id || p.id}>{p.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField select fullWidth margin="normal" label="Tipo de Movimiento" defaultValue="ENTRADA" {...register('tipoMovimiento')} error={!!errors.tipoMovimiento} helperText={errors.tipoMovimiento?.message}>
            <MenuItem value="ENTRADA">ENTRADA</MenuItem>
            <MenuItem value="SALIDA">SALIDA</MenuItem>
            <MenuItem value="AJUSTE">AJUSTE</MenuItem>
          </TextField>
          <TextField fullWidth margin="normal" label="Cantidad" type="number" {...register('cantidad')} error={!!errors.cantidad} helperText={errors.cantidad?.message} />
          <TextField fullWidth margin="normal" label="Motivo" {...register('motivo')} error={!!errors.motivo} helperText={errors.motivo?.message} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}