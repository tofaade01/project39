import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ children }) {
  return (
    <div>
      <nav className="topnav">
        <div>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>

            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
            <Link to="/user">
              <li>User Profile</li>
            </Link>
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
}
