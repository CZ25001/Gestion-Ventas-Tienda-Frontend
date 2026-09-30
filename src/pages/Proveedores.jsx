import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProveedorTable from '../components/proveedores/ProveedorTable';
import ProveedorDialog from '../components/proveedores/ProveedorDialog';
import { proveedorService } from '../services/proveedor.service';

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchProveedores = async () => {
    try {
      setProveedores(await proveedorService.getAll());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProveedores(); }, []);

  const handleOpen = (item = null) => { setSelected(item); setOpenDialog(true); };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar este proveedor?')) {
      try {
        await proveedorService.delete(id);
        fetchProveedores();
      } catch (err) {
        console.error('Error al eliminar proveedor:', err);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Proveedores</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Nuevo Proveedor</Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <ProveedorTable proveedores={proveedores} onEdit={handleOpen} onDelete={handleDelete} onRefresh={fetchProveedores} />
      </Paper>
      {openDialog && (
        <ProveedorDialog open={openDialog} onClose={() => setOpenDialog(false)} proveedor={selected} onSuccess={fetchProveedores} />
      )}
    </Box>
  );
}