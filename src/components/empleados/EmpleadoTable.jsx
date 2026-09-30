import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EmpleadoTable({ empleados = [], onEdit, onDelete }) {
  const listaEmpleados = Array.isArray(empleados) ? empleados : [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Rol / Cargo</strong></TableCell>
            <TableCell><strong>Salario</strong></TableCell>
            <TableCell><strong>Estado</strong></TableCell>
            <TableCell align="right"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaEmpleados.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">No se encontraron registros de empleados.</TableCell>
            </TableRow>
          ) : (
            listaEmpleados.map((emp) => (
              <TableRow key={emp._id || emp.id}>
                <TableCell>{emp.nombre || 'Sin nombre'}</TableCell>
                <TableCell>{emp.rol || emp.puesto || emp.cargo || '-'}</TableCell>
                <TableCell>${emp.salario ?? emp.sueldo ?? 0}</TableCell>
                <TableCell>{emp.estado || (emp.activo ? 'Activo' : 'Inactivo')}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => onEdit && onEdit(emp)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => onDelete && onDelete(emp._id || emp.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}