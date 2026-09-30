import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function InventarioTable({ inventario = [], onEdit, onDelete }) {
  const listaInventario = Array.isArray(inventario) ? inventario : [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Producto</strong></TableCell>
            <TableCell><strong>Tipo Movimiento</strong></TableCell>
            <TableCell><strong>Cantidad</strong></TableCell>
            <TableCell><strong>Motivo</strong></TableCell>
            <TableCell><strong>Fecha</strong></TableCell>
            <TableCell align="right"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaInventario.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">No hay registros de inventario.</TableCell>
            </TableRow>
          ) : (
            listaInventario.map((inv) => {
              // Manejo de producto_id populado (populate) o como objeto/string
              const nombreProducto = typeof inv.producto_id === 'object' 
                ? (inv.producto_id?.nombre || inv.producto_id?.nombreProducto) 
                : inv.productoNombre || inv.producto_id || '-';

              const fecha = inv.fecha || inv.createdAt 
                ? new Date(inv.fecha || inv.createdAt).toLocaleDateString() 
                : 'N/A';

              return (
                <TableRow key={inv._id || inv.id}>
                  <TableCell>{nombreProducto}</TableCell>
                  <TableCell>{inv.tipoMovimiento || '-'}</TableCell>
                  <TableCell>{inv.cantidad ?? 0}</TableCell>
                  <TableCell>{inv.motivo || '-'}</TableCell>
                  <TableCell>{fecha}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => onEdit && onEdit(inv)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => onDelete && onDelete(inv._id || inv.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}