import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authStore'; // Import logout action
import './Navbar.css';
import axios from 'axios';
export default function Navbar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // State to hold user data
  const [allUsers, setAllUsers] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/register'); // Make sure your API endpoint is correct
      setAllUsers(response.data); // Store all users in state
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login after logout
  };
  useEffect(() => {
    fetchUsers(); // Fetch all users when component mounts
  }, []);

  useEffect(() => {
    const emailUser = JSON.parse(localStorage.getItem('user')); // Get logged-in user email from localStorage
    if (allUsers.length > 0 && emailUser) {
      // Find the user based on the email from localStorage
      const authUser = allUsers.find((u) => u.email === emailUser.email);
      setUser(authUser); // Set the authenticated user
    }
  }, [allUsers]);
  // const emailuser = JSON.parse(localStorage.getItem('user'));
  // const authuser =
  //   user?.email && user?.email === emailuser?.email ? user : null;
  return (
    <div>
      <nav
        id="sidebarMenu"
        className={`sidebar bg-white ${isSidebarExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <div className="position-sticky">
          <div
            className="list-group list-group-flush mx-3"
            style={{ marginTop: '4rem' }}
          >
            <div
              className={`list-group-item list-group-item-action py-2 ripple ${
                location.pathname === '/' ? 'active' : ''
              }`}
            >
              <Link to="/" className="nav-link">
                <i className="fas fa-home fa-fw me-3"></i> Home
              </Link>
            </div>

            {/* Upcoming Blast Dropdown */}
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

            {/* History */}
            <div
              className={`list-group-item list-group-item-action py-2 ripple ${
                location.pathname === '/history' ? 'active' : ''
              }`}
            >
              <Link to="/history" className="nav-link">
                <i className="fas fa-history fa-fw me-3"></i> History
              </Link>
            </div>

            {/* Create New Button */}
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
                  <div className="user-profile mr-5">
                    {/* Dropdown button that shows user.name */}
                    <div className="dropdown d-inline-block mr-3">
                      <button
                        className="btn btn-light dropdown-toggle"
                        type="button"
                        onClick={toggleUserDropdown}
                        aria-expanded={isUserDropdownOpen}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: '#ed1b2f',
                        }}
                        id="userDropdown"
                      >
                        {user && user.name}
                      </button>

                      {/* Dropdown menu with logout option */}
                      {isUserDropdownOpen && (
                        <ul
                          className="dropdown-menu show"
                          aria-labelledby="userDropdown"
                        >
                          <li>
                            <button
                              className="dropdown-item m-0"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Main content area */}
        <main
          className={`main-content ${
            isSidebarExpanded ? 'expanded-content' : 'collapsed-content'
          } p-4 `}
          style={{ marginTop: '58px' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
