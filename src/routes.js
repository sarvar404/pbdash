import { Navigate, useRoutes } from 'react-router-dom';
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

//
// get access
const adminData = getStoredUserData(KEY_ADMIN);
console.log(adminData)

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: adminData?.total?.role === role ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <DashboardAppPage /> },
        { path: 'tags', element: <Tags /> },
        { path: 'events', element: <Events /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Page404 />,
    }
  ]);

  return routes;
}
