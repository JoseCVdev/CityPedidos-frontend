import { createBrowserRouter, Navigate } from 'react-router';
import { LoginPage } from './auth/pages/login/LoginPage';
import { GestionPedidosPage } from './admin/pages/gestion-pedidos/GestionPedidosPage';
import { GestionClientesPage } from './admin/pages/gestion-clientes/GestionClientesPage';
import { RoleRoute } from './components/routes/RoleRoute';
import { PublicRoute } from './components/routes/PublicRoute';
import { lazy } from 'react';

const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'));
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));

export const appRouter = createBrowserRouter([
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/auth/login" /> },
      { path: 'login', handle: { title: 'Inicio de Sesión' }, element: <LoginPage /> },
    ],
  },
  {
    path: '/pages',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/pages/gestion-pedidos" /> },

      // Acceso: ADMIN_ROLE y ORDER_ROLE
      {
        path: 'gestion-pedidos',
        handle: { title: 'Gestión de Pedidos' },
        element: (
          <RoleRoute allowedRoles={['ORDER_ROLE']}>
            <GestionPedidosPage />
          </RoleRoute>
        ),
      },

      // Acceso: ADMIN_ROLE
      {
        path: 'gestion-clientes',
        handle: { title: 'Gestión de Clientes' },
        element: (
          <RoleRoute allowedRoles={['ADMIN_ROLE']}>
            <GestionClientesPage />
          </RoleRoute>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to="/pages" /> },
]);
