import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';

//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import DashboardAppPage from './pages/DashboardAppPage';
import Tags from './pages/Tags';
import Events from './pages/Events';



// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <DashboardAppPage /> },
        { path: 'tags', element: <Tags /> },
        { path: 'events', element: <Events /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Page404 />,
    }
  ]);

  return routes;
}
