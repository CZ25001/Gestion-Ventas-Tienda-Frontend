import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InventarioTable from '../components/inventario/InventarioTable';
import InventarioDialog from '../components/inventario/InventarioDialog';
import { inventarioService } from '../services/inventario.service';

export default function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchInventario = async () => {
    try {
      setInventario(await inventarioService.getAll());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchInventario(); }, []);

  const handleOpen = (item = null) => { setSelected(item); setOpenDialog(true); };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar este registro de inventario?')) {
      try {
        await inventarioService.delete(id);
        fetchInventario();
      } catch (err) {
        console.error('Error al eliminar registro de inventario:', err);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Inventario</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Nuevo Registro</Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <InventarioTable inventario={inventario} onEdit={handleOpen} onDelete={handleDelete} onRefresh={fetchInventario} />
      </Paper>
      {openDialog && (
        <InventarioDialog open={openDialog} onClose={() => setOpenDialog(false)} inventario={selected} onSuccess={fetchInventario} />
      )}
    </Box>
  );
}