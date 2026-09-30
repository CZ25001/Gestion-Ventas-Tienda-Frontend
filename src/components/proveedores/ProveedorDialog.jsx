import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { proveedorSchema } from '../../schemas/proveedor.schema';

export default function ProveedorDialog({ open, onClose, onSave, proveedor }) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(proveedorSchema),
    defaultValues: { empresa: '', contactoNombre: '', telefono: '', direccion: '', categoriasSurtidas: [] }
  });

  useEffect(() => {
    if (proveedor) {
      setValue('empresa', proveedor.empresa);
      setValue('contactoNombre', proveedor.contactoNombre);
      setValue('telefono', proveedor.telefono);
      setValue('direccion', proveedor.direccion);
      setValue('categoriasSurtidas', proveedor.categoriasSurtidas || []);
    } else {
      reset({ empresa: '', contactoNombre: '', telefono: '', direccion: '', categoriasSurtidas: [] });
    }
  }, [proveedor, open, setValue, reset]);

  const handleFormSubmit = (data) => {
    const rawCategories = typeof data.categoriasSurtidas === 'string'
      ? data.categoriasSurtidas.split(',').map((c) => c.trim()).filter(Boolean)
      : data.categoriasSurtidas;

    onSave({ ...data, categoriasSurtidas: rawCategories });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{proveedor ? 'Editar Proveedor' : 'Nuevo Proveedor'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Empresa" {...register('empresa')} error={!!errors.empresa} helperText={errors.empresa?.message} />
          <TextField fullWidth margin="normal" label="Nombre de Contacto" {...register('contactoNombre')} error={!!errors.contactoNombre} helperText={errors.contactoNombre?.message} />
          <TextField fullWidth margin="normal" label="Teléfono" {...register('telefono')} error={!!errors.telefono} helperText={errors.telefono?.message} />
          <TextField fullWidth margin="normal" label="Dirección" {...register('direccion')} error={!!errors.direccion} helperText={errors.direccion?.message} />
          <TextField fullWidth margin="normal" label="Categorías Surtidas (separadas por coma)" {...register('categoriasSurtidas')} error={!!errors.categoriasSurtidas} helperText={errors.categoriasSurtidas?.message} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}