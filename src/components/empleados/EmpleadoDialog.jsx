import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormControlLabel, Checkbox, Box } from '@mui/material';
import { empleadoSchema } from '../../schemas/empleado.schema';

export default function EmpleadoDialog({ open, onClose, onSave, empleado }) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(empleadoSchema),
    defaultValues: { nombre: '', rol: 'CAJERO', salario: 0, activo: true }
  });

  useEffect(() => {
    if (empleado) {
      setValue('nombre', empleado.nombre);
      setValue('rol', empleado.rol);
      setValue('salario', empleado.salario);
      setValue('activo', empleado.activo);
    } else {
      reset({ nombre: '', rol: 'CAJERO', salario: 0, activo: true });
    }
  }, [empleado, open, setValue, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{empleado ? 'Editar Empleado' : 'Nuevo Empleado'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSave)}>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Nombre" {...register('nombre')} error={!!errors.nombre} helperText={errors.nombre?.message} />
          <TextField select fullWidth margin="normal" label="Rol" defaultValue="CAJERO" {...register('rol')} error={!!errors.rol} helperText={errors.rol?.message}>
            <MenuItem value="CAJERO">CAJERO</MenuItem>
            <MenuItem value="ADMINISTRADOR">ADMINISTRADOR</MenuItem>
            <MenuItem value="INVENTARIADOR">INVENTARIADOR</MenuItem>
          </TextField>
          <TextField fullWidth margin="normal" label="Salario" type="number" {...register('salario')} error={!!errors.salario} helperText={errors.salario?.message} />
          <FormControlLabel control={<Checkbox checked={watch('activo')} onChange={(e) => setValue('activo', e.target.checked)} />} label="Empleado Activo" sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}