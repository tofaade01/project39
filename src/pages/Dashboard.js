import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../layouts/Navbar';

function Dashboard() {
  return (
    <Navbar>
      <div className="dashboard">
        <h2>Dashboard Page</h2>
        <nav>
          <ul>
            <li>
              <Link to="overview">Overview</Link>
            </li>
            <li>
              <Link to="stats">Stats</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </Navbar>
  );
}

export default Dashboard;
