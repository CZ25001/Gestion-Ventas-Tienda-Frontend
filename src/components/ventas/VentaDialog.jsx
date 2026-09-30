import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material';
import { ventaSchema } from '../../schemas/venta.schema';
import { clienteService } from '../../services/cliente.service';
import { empleadoService } from '../../services/empleado.service';

export default function VentaDialog({ open, onClose, onSave, venta }) {
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(ventaSchema),
    defaultValues: { empleado_id: '', cliente_id: '', total: 0, metodoPago: 'EFECTIVO', detalles: [] }
  });

  useEffect(() => {
    if (open) {
      clienteService.getAll().then(setClientes).catch(console.error);
      empleadoService.getAll().then(setEmpleados).catch(console.error);
    }
  }, [open]);

  useEffect(() => {
    if (venta) {
      setValue('empleado_id', venta.empleado_id?._id || venta.empleado_id);
      setValue('cliente_id', venta.cliente_id?._id || venta.cliente_id || '');
      setValue('total', venta.total);
      setValue('metodoPago', venta.metodoPago || 'EFECTIVO');
      setValue('detalles', venta.detalles || []);
    } else {
      reset({ empleado_id: '', cliente_id: '', total: 0, metodoPago: 'EFECTIVO', detalles: [] });
    }
  }, [venta, open, setValue, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{venta ? 'Editar Venta' : 'Nueva Venta'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSave)}>
        <DialogContent>
          <TextField select fullWidth margin="normal" label="Empleado" defaultValue="" {...register('empleado_id')} error={!!errors.empleado_id} helperText={errors.empleado_id?.message}>
            {empleados.map((e) => (
              <MenuItem key={e._id || e.id} value={e._id || e.id}>{e.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField select fullWidth margin="normal" label="Cliente (Opcional)" defaultValue="" {...register('cliente_id')} error={!!errors.cliente_id} helperText={errors.cliente_id?.message}>
            <MenuItem value="">Sin cliente (General)</MenuItem>
            {clientes.map((c) => (
              <MenuItem key={c._id || c.id} value={c._id || c.id}>{c.nombre}</MenuItem>
            ))}
          </TextField>
          <TextField select fullWidth margin="normal" label="Método de Pago" defaultValue="EFECTIVO" {...register('metodoPago')} error={!!errors.metodoPago} helperText={errors.metodoPago?.message}>
            <MenuItem value="EFECTIVO">EFECTIVO</MenuItem>
            <MenuItem value="TARJETA">TARJETA</MenuItem>
            <MenuItem value="TRANSFERENCIA">TRANSFERENCIA</MenuItem>
          </TextField>
          <TextField fullWidth margin="normal" label="Total" type="number" {...register('total')} error={!!errors.total} helperText={errors.total?.message} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}