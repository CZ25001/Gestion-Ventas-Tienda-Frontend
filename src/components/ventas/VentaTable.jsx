import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function VentaTable({ ventas = [], onEdit, onDelete }) {
  const listaVentas = Array.isArray(ventas) ? ventas : [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Cliente</strong></TableCell>
            <TableCell><strong>Método de Pago</strong></TableCell>
            <TableCell><strong>Total</strong></TableCell>
            <TableCell><strong>Fecha</strong></TableCell>
            <TableCell align="right"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaVentas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">No hay ventas registradas.</TableCell>
            </TableRow>
          ) : (
            listaVentas.map((vta) => {
              // Obtiene el cliente de cliente_id (populado o id)
              const cliente = typeof vta.cliente_id === 'object' 
                ? (vta.cliente_id?.nombre || vta.cliente_id?.nombreCompleto) 
                : vta.cliente_id || 'Cliente General';

              const fecha = vta.fecha || vta.createdAt 
                ? new Date(vta.fecha || vta.createdAt).toLocaleDateString() 
                : 'N/A';

              return (
                <TableRow key={vta._id || vta.id}>
                  <TableCell>{cliente}</TableCell>
                  <TableCell>{vta.metodoPago || '-'}</TableCell>
                  <TableCell>${vta.total ?? 0}</TableCell>
                  <TableCell>{fecha}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => onEdit && onEdit(vta)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => onDelete && onDelete(vta._id || vta.id)}><DeleteIcon /></IconButton>
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