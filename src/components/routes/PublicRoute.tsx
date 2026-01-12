import { useAuthStore } from '@/auth/store/auth.store';
import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

export const PublicRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === 'checking') return null;

  // Si ya está autenticado → NO puede ver login
  if (authStatus === 'authenticated') {
    return <Navigate to="/pages" replace />;
  }

  return children;
};
