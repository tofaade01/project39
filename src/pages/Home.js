// src/components/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlasts } from '../redux/blastStore'; // Import the getAllBlasts action
import Navbar from '../layouts/Navbar';
import './Home.css';
import images from '../images/Frame.svg';
function Home() {
  const dispatch = useDispatch();
  const { blasts, loading, error } = useSelector((state) => state.blast); // Get state from blastSlice

  useEffect(() => {
    dispatch(getAllBlasts());
  }, [dispatch]);
  return (
    <Navbar>
      <div className="home-container">
        <div
          className="image-text-container d-flex"
          style={{ backgroundColor: '#FEF3F6' }}
        >
          <div className="top-message px-3 mt-4">
            <h1>
              Boost your social life, blast it anywhere in one-click away!
            </h1>
            <p>
              Set up a new template according to your needs with our cool
              features.
            </p>
          </div>
          <img src={images} alt="testing"></img>
        </div>
        <div className="insight-section">
          <div className="insight-card call-insight">
            <h3>CALL</h3>
            <div className="insight-icons">
              <i className="fab fa-instagram"></i>
              <i className="fab fa-tiktok"></i>
              <i className="fab fa-x-twitter"></i>
            </div>
            <p>Total Reach Out Audience</p>
            <h2>115,000</h2>
          </div>
          <div className="insight-card video-insight">
            <h3>Video</h3>
            <div className="insight-icons">
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-tiktok"></i>
            </div>
            <div>
              <p>Total Viewers</p>
              <h2>78,000</h2>
              <p>Video</p>
            </div>
          </div>
          <div className="insight-card photo-insight">
            <h3>Photo</h3>
            <div className="insight-icons">
              <i className="fab fa-instagram"></i>
              <i className="fab fa-x-twitter"></i>
            </div>
            <p>Total Likes</p>
            <h2>35,000</h2>
            <p>Photo</p>
          </div>
          <div className="insight-card text-insight">
            <h3>Text</h3>
            <i className="fab fa-x-twitter"></i>
            <p>Total Re-Tweet</p>
            <h2>2,000</h2>
            <p>Text</p>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="broadcast-activities">
            <h3>Recent Broadcast Activities</h3>
            {error ? (
              <p className="error-message">{error}</p>
            ) : (
              <table className="broadcast-table">
                <thead>
                  <tr>
                    <th>Campaign Name</th>
                    <th>Media Campaign</th>
                    <th>Channel</th>
                    <th>Total Broadcast</th>
                    <th>Created Date</th>
                    <th>Broadcast Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(blasts) ? (
                    blasts.map((blast) => (
                      <tr key={blast._id}>
                        <td>{blast.title}</td>
                        <td>{blast.media}</td>
                        <td>
                          {Array.isArray(blast.channel)
                            ? blast.channel.join(', ')
                            : blast.channel}
                        </td>
                        <td>{blast.totalBroadcast}</td>
                        <td>
                          {new Date(blast.createdDate).toLocaleDateString()}
                        </td>
                        <td>{new Date(blast.date).toLocaleDateString()}</td>
                        <td>{blast.status}</td>
                      </tr>
                    ))
                  ) : (
                    <p>No Broadcast Activities Found</p>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </Navbar>
  );
}

export default Home;
