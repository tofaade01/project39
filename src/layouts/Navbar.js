import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authStore'; // Import logout action
import './Navbar.css';

export default function Navbar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux store
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div>
      <nav
        id="sidebarMenu"
        className={`sidebar bg-white ${isSidebarExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-5">
            <div
              className={`list-group-item list-group-item-action py-2 ripple ${
                location.pathname === '/' ? 'active' : ''
              }`}
            >
              <Link to="/" className="nav-link">
                <i className="fas fa-home fa-fw me-3"></i> Home
              </Link>
            </div>
            <div className="list-group-item nav-item dropdown">
              <div
                className={`nav-link dropdown-toggle ${
                  location.pathname.includes('/blast') ? 'active' : ''
                }`}
                id="navbarDropdown"
                role="button"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                <i className="fas fa-clock fa-fw me-3"></i> Upcoming Blast
              </div>
              <ul
                className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link to="/blast/photo" className="dropdown-item">
                    Photo
                  </Link>
                </li>
                <li>
                  <Link to="/blast/text" className="dropdown-item">
                    Text
                  </Link>
                </li>
                <li>
                  <Link to="/blast/video" className="dropdown-item">
                    Video
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className={`list-group-item list-group-item-action py-2 ripple ${
                location.pathname === '/history' ? 'active' : ''
              }`}
            >
              <Link to="/history" className="nav-link">
                <i className="fas fa-history fa-fw me-3"></i> History
              </Link>
            </div>
            <div
              className={`list-group-item list-group-item-action py-2 ripple ${
                location.pathname === '/user' ? 'active' : ''
              }`}
            >
              <Link to="/user" className="nav-link">
                <i className="fas fa-user fa-fw me-3"></i> User Profile
              </Link>
            </div>
            <div
              className="list-group-item list-group-item-action py-2 ripple"
              style={{ marginTop: '200px' }}
            >
              <Link to="/create" className="nav-link">
                <button className="btn btn-danger">CREATE NEW</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        {/* Top Navbar */}
        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        >
          <div className="container-fluid">
            <img
              src="https://ocaindonesia.co.id/img/logo-oca.c73d3ef3.webp"
              alt="Logo"
              style={{ height: '50px' }}
            />
            <div className="navbar-right d-flex">
              {!isAuthenticated ? (
                <li
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    location.pathname === '/login' ? 'active' : ''
                  }`}
                >
                  <Link to="/login" className="nav-link">
                    <button className="btn btn-dark">Login</button>
                  </Link>
                </li>
              ) : (
                <>
                  <div className="user-profile">
                    <img
                      src="https://via.placeholder.com/40" // Replace with actual image or profile link
                      alt="User"
                      className="rounded-circle"
                    />
                    <span>{user?.username}</span> {/* Show the user's name */}
                  </div>
                  <li className="list-group-item list-group-item-action py-2 ripple">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Main content area */}
        <main className="main-content p-4" style={{ marginTop: '58px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
