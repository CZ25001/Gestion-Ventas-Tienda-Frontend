import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EmpleadoTable from '../components/empleados/EmpleadoTable';
import EmpleadoDialog from '../components/empleados/EmpleadoDialog';
import { empleadoService } from '../services/empleado.service';

export default function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchEmpleados = async () => {
    try {
      setEmpleados(await empleadoService.getAll());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchEmpleados(); }, []);

  const handleOpen = (item = null) => { setSelected(item); setOpenDialog(true); };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar este empleado?')) {
      try {
        await empleadoService.delete(id);
        fetchEmpleados();
      } catch (err) {
        console.error('Error al eliminar empleado:', err);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Empleados</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Nuevo Empleado</Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <EmpleadoTable empleados={empleados} onEdit={handleOpen} onDelete={handleDelete} onRefresh={fetchEmpleados} />
      </Paper>
      {openDialog && (
        <EmpleadoDialog open={openDialog} onClose={() => setOpenDialog(false)} empleado={selected} onSuccess={fetchEmpleados} />
      )}
    </Box>
  );
}