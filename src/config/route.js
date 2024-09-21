import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector for Redux
import MENUS from './menus';
import Home from '../pages/Home';
import BlastImage from '../pages/ImageBlast';
import TextBlast from '../pages/TextBlast';
import VideoBlast from '../pages/VideoBlast';
import BlastForm from '../pages/BlastForm';
import History from '../pages/History';
import PageNotFound from '../pages/PageNotFound';
import ProtectedRoute from '../pages/ProtectedRoute';
import Register from '../pages/Register';
import Login from '../pages/Login';
const AppRoute = () => {
  // Access the authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Suspense fallback={<div>Loading Component...</div>}>
      <Router>
        <Routes>
          <Route
            path={MENUS.HOME}
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<Home />}
              />
            }
          />
          <Route
            path={MENUS.BLASTFORM}
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<BlastForm />}
              />
            }
          />
          <Route
            path={MENUS.HISTORY}
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<History />}
              />
            }
          />
          <Route
            path="/blast/photo"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<BlastImage />}
              />
            }
          />
          <Route
            path="/blast/text"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<TextBlast />}
              />
            }
          />
          <Route
            path="/blast/video"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<VideoBlast />}
              />
            }
          />
          <Route path="/register" element={<Register />} />{' '}
          {/* Add Register route */}
          <Route path="/login" element={<Login />} /> {/* Add Login route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRoute;
