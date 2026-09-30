import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { clienteService } from '../../services/cliente.service';

export default function ClienteDialog({ open, onClose, cliente, onSuccess }) {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (cliente) {
      setValue('nombre', cliente.nombre || '');
      setValue('telefono', cliente.telefono || '');
      setValue('email', cliente.email || '');
      setValue('puntosAcumulados', cliente.puntosAcumulados ?? 0);
    } else {
      reset();
    }
  }, [cliente, setValue, reset]);

  // Función que procesa los datos validados
  const onSubmit = async (data) => {
    try {
      if (cliente?._id || cliente?.id) {
        await clienteService.update(cliente._id || cliente.id, data);
      } else {
        await clienteService.create(data);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{cliente ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
      {/* Es clave que handleSubmit envuelva a onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label="Nombre" fullWidth {...register('nombre', { required: true })} />
            <TextField label="Teléfono" fullWidth {...register('telefono')} />
            <TextField label="Email" type="email" fullWidth {...register('email')} />
            <TextField label="Puntos Acumulados" type="number" fullWidth {...register('puntosAcumulados')} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}