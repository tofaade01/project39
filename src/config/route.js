import React, { Suspense, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MENUS from './menus';

// Not using lazy load
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import Overview from '../pages/Overview';
import Stats from '../pages/Stats';
import PageNotFound from '../pages/PageNotFound';
import ProtectedRoute from '../pages/ProtectedRoute';

// Using lazy load
const Users = React.lazy(() => import('../pages/Users'));
const UserDetails = React.lazy(() => import('../pages/UserDetails'));

const AppRoute = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const handleAuth = () => {
    setisLoggedIn(!isLoggedIn);
  };

  const router = createBrowserRouter([
    {
      path: MENUS.HOME,
      element: <Home />,
    },
    {
      path: MENUS.ABOUT,
      element: <About />,
    },
    {
      path: MENUS.CONTACT,
      element: <Contact />,
    },
    {
      path: MENUS.DASHBOARD,
      element: <Dashboard />,
      children: [
        {
          path: MENUS.DASHBOARD_OVERVIEW,
          element: <Overview />,
        },
        {
          path: MENUS.DASHBOARD_STATS,
          element: <Stats />,
        },
      ],
    },
    {
      path: MENUS.USER,
      element: (
        <ProtectedRoute isAuthenticated={isLoggedIn} element={<Users />} />
      ),
    },
    {
      path: MENUS.USER_DETAILS,
      element: (
        <ProtectedRoute
          isAuthenticated={isLoggedIn}
          element={<UserDetails />}
        />
      ),
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);

  return (
    <>
      <div style={{ display: 'block' }}>
        <button onClick={handleAuth}>{isLoggedIn ? 'Logout' : 'Login'}</button>
      </div>

      <Suspense fallback={<>Loading Component</>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default AppRoute;
