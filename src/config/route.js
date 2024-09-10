// eslint-disable-next-line
import React, { Suspense, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MENUS from './menus';
import Home from '../pages/Home';
import BlastImage from '../pages/ImageBlast';
import TextBlast from '../pages/TextBlast';
import VideoBlast from '../pages/VideoBlast';
import BlastForm from '../pages/BlastForm';
import Dashboard from '../pages/Dashboard';
import Overview from '../pages/Overview';
import Stats from '../pages/Stats';
import PageNotFound from '../pages/PageNotFound';
import ProtectedRoute from '../pages/ProtectedRoute';
import Register from '../pages/Register'; // Import Register page
import Login from '../pages/Login'; // Import Login page

export const AuthContext = createContext();

const Users = React.lazy(() => import('../pages/Users'));
const UserDetails = React.lazy(() => import('../pages/UserDetails'));

const AppRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  console.log(AuthContext.Provider)
  return (
    <AuthContext.Provider value={{ isLoggedIn, handleAuth }}>
      <Suspense fallback={<div>Loading Component...</div>}>
        <Router>
          <Routes>
            <Route path={MENUS.HOME} element={<Home />} />
            <Route path={MENUS.BLASTFORM} element={<BlastForm />} />
            <Route path={MENUS.DASHBOARD} element={<Dashboard />} />
            <Route path={MENUS.DASHBOARD_OVERVIEW} element={<Overview />} />
            <Route path={MENUS.DASHBOARD_STATS} element={<Stats />} />
            <Route path="/blast/photo" element={<BlastImage />} />
            <Route path="/blast/text" element={<TextBlast />} />
            <Route path="/blast/video" element={<VideoBlast />} />
            <Route
              path={MENUS.USER}
              element={<ProtectedRoute isAuthenticated={isLoggedIn} element={<Users />}></ProtectedRoute>}
            />
            <Route
              path={MENUS.USER_DETAILS}
              element={<ProtectedRoute isAuthenticated={isLoggedIn} element={<UserDetails />}></ProtectedRoute>}
            />
            <Route path="/register" element={<Register />} /> {/* Add Register route */}
            <Route path="/login" element={<Login />} /> {/* Add Login route */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </AuthContext.Provider>
  );
};

export default AppRoute;
