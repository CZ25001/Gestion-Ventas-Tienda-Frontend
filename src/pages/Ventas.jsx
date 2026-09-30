import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VentaTable from '../components/ventas/VentaTable';
import VentaDialog from '../components/ventas/VentaDialog';
import { ventaService } from '../services/venta.service';

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchVentas = async () => {
    try {
      setVentas(await ventaService.getAll());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchVentas(); }, []);

  const handleOpen = (item = null) => { setSelected(item); setOpenDialog(true); };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar esta venta?')) {
      try {
        await ventaService.delete(id);
        fetchVentas();
      } catch (err) {
        console.error('Error al eliminar venta:', err);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Ventas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Nueva Venta</Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <VentaTable ventas={ventas} onEdit={handleOpen} onDelete={handleDelete} onRefresh={fetchVentas} />
      </Paper>
      {openDialog && (
        <VentaDialog open={openDialog} onClose={() => setOpenDialog(false)} venta={selected} onSuccess={fetchVentas} />
      )}
    </Box>
  );
}