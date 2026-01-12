import { useAuthStore } from '@/auth/store/auth.store';
import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

interface RoleRouteProps extends PropsWithChildren {
  allowedRoles: string[];
}

export const RoleRoute = ({ children, allowedRoles }: RoleRouteProps) => {
  const { authStatus, usuario } = useAuthStore();

  if (authStatus === 'checking') return null;

  if (authStatus === 'not-authenticated') {
    return <Navigate to="/auth/login" />;
  }

  // ADMIN siempre pasa
  if (usuario?.nombreRol === 'ADMIN_ROLE') {
    return children;
  }

  // Validación por rol
  if (!allowedRoles.includes(usuario?.nombreRol ?? '')) {
    return <Navigate to="/pages" />;
  }

  return children;
};
