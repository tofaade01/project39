import React from 'react';
import Navbar from '../layouts/Navbar';
import './History.css'; // Import a CSS file for custom styling

function History() {
  const broadcastData = [
    {
      campaignName: 'Start Up Scholarship',
      media: 'Image',
      channel: 'Instagram, X, WhatsApp',
      createdDate: '05-09-2024',
      broadcastDate: '06-09-2024 03.00 p.m',
      status: 'Finish',
    },
    {
      campaignName: 'Start Up Scholarship',
      media: 'Video',
      channel: 'Instagram, YouTube, TikTok',
      createdDate: '05-09-2024',
      broadcastDate: '06-09-2024 01.00 p.m',
      status: 'Finish',
    },
    {
      campaignName: 'Meriah Awal Bulan',
      media: 'Image',
      channel: 'Instagram, X',
      createdDate: '30-08-2024',
      broadcastDate: '01-08-2024 01.00 p.m',
      status: 'Finish',
    },
    // Add more rows as needed
  ];

  return (
    <Navbar>
      <div className="history-page">
        <div className="header-section">
          <h1>Let's take a look on your journey</h1>
          <img
            src="https://www.bootstrapdash.com/blog/wp-content/uploads/2020/01/BD-jumbotron-examples.jpg" // Replace with actual image path
            alt="Journey Illustration"
            className="journey-illustration"
          />
        </div>

        <div className="table-section">
          <h2>History Broadcast Activities</h2>
          <table className="broadcast-table">
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Media</th>
                <th>Channel</th>
                <th>Created Date</th>
                <th>Broadcast Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {broadcastData.map((item, index) => (
                <tr key={index}>
                  <td>{item.campaignName}</td>
                  <td>{item.media}</td>
                  <td>{item.channel}</td>
                  <td>{item.createdDate}</td>
                  <td>{item.broadcastDate}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination can be added here */}
          <div className="pagination">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            {/* Add more pagination buttons as needed */}
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default History;
