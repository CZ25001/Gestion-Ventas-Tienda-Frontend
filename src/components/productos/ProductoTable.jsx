import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductoTable({ productos = [], onEdit, onDelete }) {
  const listaProductos = Array.isArray(productos) ? productos : [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Código de Barras</strong></TableCell>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Categoría</strong></TableCell>
            <TableCell><strong>Precio Venta</strong></TableCell>
            <TableCell align="right"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaProductos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">No hay productos registrados.</TableCell>
            </TableRow>
          ) : (
            listaProductos.map((prod) => (
              <TableRow key={prod._id || prod.id}>
                <TableCell>{prod.codigoBarras || '-'}</TableCell>
                <TableCell>{prod.nombre || '-'}</TableCell>
                {/* Mapea desde prod.especificaciones.categoria de tu schema */}
                <TableCell>{prod.especificaciones?.categoria || prod.categoria || '-'}</TableCell>
                {/* Mapea desde prod.precioVenta de tu schema */}
                <TableCell>${prod.precioVenta ?? prod.precio ?? 0}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => onEdit && onEdit(prod)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => onDelete && onDelete(prod._id || prod.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}