import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../config/route';
import './Navbar.css';

export default function Navbar({ children }) {
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav id="sidebarMenu" className="sidebar bg-white collapse d-sm-block">
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-5">
            <div className={`${location.pathname === '/' ? 'active' : ''} list-group-item list-group-item-action py-2 ripple`}>
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
            <i className="fas fa-info-circle fa-fw me-3"></i> Upcoming Blast
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
            <div className={`${location.pathname === '/dashboard' ? 'active' : ''} list-group-item list-group-item-action py-2 ripple`}>
              <Link to="/dashboard" className="nav-link">
                <i className="fas fa-chart-line fa-fw me-3"></i> Dashboard
              </Link>
            </div>
            <div className={`${location.pathname === '/user' ? 'active' : ''} list-group-item list-group-item-action py-2 ripple`}>
              <Link to="/user" className="nav-link">
                <i className="fas fa-user fa-fw me-3"></i> User Profile
              </Link>
            </div>
            <div className={`${location.pathname === '/create'} list-group-item list-group-item-action py-2 ripple`}>
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
        <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
          <div className="container-fluid">
          <img src="https://ocaindonesia.co.id/img/logo-oca.c73d3ef3.webp" alt="Logo" style={{ height: '50px' }}></img>
            <div className="navbar-right d-flex">
            {!isLoggedIn && (
              <>
                <li className={`${location.pathname === '/login' ? 'active' : ''} list-group-item list-group-item-action py-2 ripple`}>
                  <Link to="/login" className="nav-link">
                    <button className="btn btn-dark">Login</button>
                  </Link>
                </li>
              </>
            )}
              <div className="user-profile">
                <img
                  src="https://via.placeholder.com/40" // Replace with actual image or profile link
                  alt="User"
                  className="rounded-circle"
                />
              </div>
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
