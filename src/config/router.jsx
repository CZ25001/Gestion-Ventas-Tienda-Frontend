import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../pages/Login';
import Productos from '../pages/Productos';
import Inventario from '../pages/Inventario';
import Ventas from '../pages/Ventas';
import Clientes from '../pages/Clientes';
import Empleados from '../pages/Empleados';
import Proveedores from '../pages/Proveedores';
import Usuarios from '../pages/Usuarios';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/productos" replace />,
      },
      {
        path: 'productos',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN', 'MANTENIMIENTO']}>
            <Productos />
          </ProtectedRoute>
        ),
      },
      {
        path: 'inventario',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN', 'MANTENIMIENTO']}>
            <Inventario />
          </ProtectedRoute>
        ),
      },
      {
        path: 'ventas',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN', 'MANTENIMIENTO']}>
            <Ventas />
          </ProtectedRoute>
        ),
      },
      {
        path: 'clientes',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN', 'MANTENIMIENTO']}>
            <Clientes />
          </ProtectedRoute>
        ),
      },
      {
        path: 'empleados',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Empleados />
          </ProtectedRoute>
        ),
      },
      {
        path: 'proveedores',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN', 'MANTENIMIENTO']}>
            <Proveedores />
          </ProtectedRoute>
        ),
      },
      {
        path: 'usuarios',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Usuarios />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/productos" replace />,
  },
]);