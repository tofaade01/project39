import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div>
      <nav className="navbar navbar-expand" style={{ backgroundColor: 'rgba(150,30,40, 0.8)' }}>
        <div className="navbar-nav mr-auto">
          <Link to="/" className="nav-link" style={{ color: 'white', fontSize: 'x-large' }}>
            <i className="fas fa-home-lg"></i>
          </Link>
        </div>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/register" className="nav-link" style={{ color: 'white' }}>
              <i className="fas fa-user-plus"></i> Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" style={{ color: 'white' }}>
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          </li>
        </div>
      </nav>

      <div className="container">
        {/* This is where the login/register components will go */}
        <Outlet />
      </div>
    </div>
  );
}
