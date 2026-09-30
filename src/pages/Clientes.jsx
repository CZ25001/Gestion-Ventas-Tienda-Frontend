import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClienteTable from '../components/clientes/ClienteTable';
import ClienteDialog from '../components/clientes/ClienteDialog';
import { clienteService } from '../services/cliente.service';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchClientes = async () => {
    try { setClientes(await clienteService.getAll()); } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchClientes(); }, []);

  const handleOpen = (item = null) => { setSelected(item); setOpenDialog(true); };

  // 1. Agregar manejador para eliminar
  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar este cliente?')) {
      try {
        await clienteService.delete(id);
        fetchClientes();
      } catch (err) {
        console.error('Error al eliminar cliente:', err);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Clientes</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Nuevo Cliente</Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        {/* 2. Pasar onDelete={handleDelete} */}
        <ClienteTable clientes={clientes} onEdit={handleOpen} onDelete={handleDelete} onRefresh={fetchClientes} />
      </Paper>
      {openDialog && (
        <ClienteDialog open={openDialog} onClose={() => setOpenDialog(false)} cliente={selected} onSuccess={fetchClientes} />
      )}
    </Box>
  );
}