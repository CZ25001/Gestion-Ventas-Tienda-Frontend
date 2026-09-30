import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ClienteTable({ clientes = [], onEdit, onDelete }) {
  console.log('2. Prop "clientes" recibida en la tabla:', clientes); // <-- Revisa esto

  const listaClientes = Array.isArray(clientes) ? clientes : [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Teléfono</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Puntos Acumulados</strong></TableCell>
            <TableCell><strong>Fecha Registro</strong></TableCell>
            <TableCell align="right"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaClientes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No se encontraron registros de clientes.
              </TableCell>
            </TableRow>
          ) : (
            listaClientes.map((cli) => (
              <TableRow key={cli._id || cli.id}>
                <TableCell>{cli.nombre || 'Sin nombre'}</TableCell>
                <TableCell>{cli.telefono || '-'}</TableCell>
                <TableCell>{cli.email || '-'}</TableCell>
                <TableCell>{cli.puntosAcumulados ?? 0}</TableCell>
                <TableCell>
                  {cli.fechaRegistro ? new Date(cli.fechaRegistro).toLocaleDateString() : 'N/A'}
                </TableCell>
<TableCell align="right">
  <IconButton color="primary" onClick={() => onEdit && onEdit(cli)}><EditIcon /></IconButton>
  <IconButton color="error" onClick={() => onDelete && onDelete(cli._id || cli.id)}><DeleteIcon /></IconButton>
</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}