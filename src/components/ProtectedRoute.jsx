import { Navigate } from 'react-router-dom';
import { env } from '../schemas/env.schema';

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const isAuthenticated = env.VITE_AUTH_MODE === 'cookie' ? !!user : !!token;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/productos" replace />;
  }

  return children;
}