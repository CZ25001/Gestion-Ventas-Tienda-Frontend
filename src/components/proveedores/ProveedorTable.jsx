import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProveedorTable({ proveedores = [], onEdit, onDelete }) {
  const listaProveedores = Array.isArray(proveedores) ? proveedores : [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Empresa</strong></TableCell>
            <TableCell><strong>Contacto</strong></TableCell>
            <TableCell><strong>Teléfono</strong></TableCell>
            <TableCell><strong>Dirección</strong></TableCell>
            <TableCell align="right"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaProveedores.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">No hay proveedores registrados.</TableCell>
            </TableRow>
          ) : (
            listaProveedores.map((prov) => (
              <TableRow key={prov._id || prov.id}>
                {/* Campos exactos de tu proveedor.model.js */}
                <TableCell>{prov.empresa || '-'}</TableCell>
                <TableCell>{prov.contactoNombre || prov.contacto || '-'}</TableCell>
                <TableCell>{prov.telefono || '-'}</TableCell>
                <TableCell>{prov.direccion || '-'}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => onEdit && onEdit(prov)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => onDelete && onDelete(prov._id || prov.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}