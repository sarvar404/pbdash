import { useMemo } from 'react';
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';

//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import DashboardAppPage from './pages/DashboardAppPage';
import Tags from './pages/Tags';
import Events from './pages/Events';
import { getStoredUserData } from './pages/context/Utils';
import { KEY_ADMIN, role } from './enum';
import Notification from './pages/Notification';
import Billings from './pages/Billings';

//
// get access

export default function Router() {
  const navigate = useNavigate();

  const adminData = getStoredUserData(KEY_ADMIN);

  useMemo(() => {
    if (adminData !== null) {
      navigate('/dashboard');
    }
  }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: adminData?.total?.role === role ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <DashboardAppPage /> },
        { path: 'tags', element: <Tags /> },
        { path: 'events', element: <Events /> },
        { path: 'notification', element: <Notification /> },
        { path: 'bills', element: <Billings /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
