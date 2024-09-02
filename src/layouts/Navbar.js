import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../config/route';

export default function Navbar({ children }) {
  const location = useLocation();
  const { isLoggedIn, handleAuth } = useContext(AuthContext);

  return (
    <div>
      <nav className="topnav">
        <div>
          <ul className='navbar-nav nav-pills'>
            <li className='nav-item'>
              <Link to="/" className={`nav-link px-2 ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/about" className={`nav-link px-2 ${location.pathname === '/about' ? 'active' : ''}`}>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/contact" className={`nav-link px-2 ${location.pathname === '/contact' ? 'active' : ''}`}>
                Contact
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/dashboard" className={`nav-link px-2 ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                Dashboard
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/user" className={`nav-link px-2 ${location.pathname === '/user' ? 'active' : ''}`}>
                User Profile
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className='nav-item'>
                  <Link to="/register" className={`nav-link px-2 ${location.pathname === '/register' ? 'active' : ''}`}>
                    Register
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to="/login" className={`nav-link px-2 ${location.pathname === '/login' ? 'active' : ''}`}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex">
            <button className="btn btn-outline-primary" onClick={handleAuth}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
