import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductoTable from '../components/productos/ProductoTable';
import ProductoDialog from '../components/productos/ProductoDialog';
import { productoService } from '../services/producto.service';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchProductos = async () => {
    try {
      setProductos(await productoService.getAll());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProductos(); }, []);

  const handleOpen = (item = null) => { setSelected(item); setOpenDialog(true); };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar este producto?')) {
      try {
        await productoService.delete(id);
        fetchProductos();
      } catch (err) {
        console.error('Error al eliminar producto:', err);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Productos</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Nuevo Producto</Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <ProductoTable productos={productos} onEdit={handleOpen} onDelete={handleDelete} onRefresh={fetchProductos} />
      </Paper>
      {openDialog && (
        <ProductoDialog open={openDialog} onClose={() => setOpenDialog(false)} producto={selected} onSuccess={fetchProductos} />
      )}
    </Box>
  );
}