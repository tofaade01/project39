import React from 'react';
import Navbar from '../layouts/Navbar';
import './imageblast.css'; // Add your custom CSS for styling

function BlastImage() {
  return (
    <Navbar>
      <div className="upcoming-blast-container">
        {/* Search and Header Section */}
        <div className="blast-header">
          <h2>Recent Image Content Broadcast Activities</h2>
          <p>Monitor each of your broadcast processes and activities</p>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        {/* Cards Section */}
        <div className="broadcast-cards-container">
          <div className="broadcast-card">
            <div className="broadcast-image">
              <img src="https://via.placeholder.com/150" alt="Campaign" />
            </div>
            <div className="broadcast-details">
              <h3>Bulan Berkah</h3>
              <p>
                <i className="fas fa-calendar-alt"></i> Broadcast Date: 06-09-2024 <br />
                <i className="fas fa-clock"></i> Time Blast: 10:00 AM <br />
                <i className="fas fa-broadcast-tower"></i> Total Broadcast: 2,000
              </p>
              <p>
                Hidupkan hati, hidupkan sesama. Mari bergabung dalam Program Bulan Berkah...
              </p>
              <div className="card-buttons">
                <button className="cancel-btn">CANCEL</button>
                <button className="blast-btn">BLAST NOW</button>
              </div>
            </div>
            <div className="edit-icon">
              <i className="fas fa-pen"></i>
            </div>
          </div>

          {/* Repeat for other campaigns */}
          <div className="broadcast-card">
            <div className="broadcast-image">
              <img src="https://via.placeholder.com/150" alt="Campaign" />
            </div>
            <div className="broadcast-details">
              <h3>Start Up Scholarship</h3>
              <p>
                <i className="fas fa-calendar-alt"></i> Broadcast Date: 06-09-2024 <br />
                <i className="fas fa-clock"></i> Time Blast: 10:00 AM <br />
                <i className="fas fa-broadcast-tower"></i> Total Broadcast: 2,000
              </p>
              <p>
                S2 sambil meniti karir? Bisa banget! Yuk join Star Up Scholarship dari OCA...
              </p>
              <div className="card-buttons">
                <button className="cancel-btn">CANCEL</button>
                <button className="blast-btn">BLAST NOW</button>
              </div>
            </div>
            <div className="edit-icon">
              <i className="fas fa-pen"></i>
            </div>
          </div>

          {/* Add more cards as needed */}
        </div>

        {/* Pagination Section */}
        <div className="pagination">
          <button className="pagination-btn">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">...</button>
          <button className="pagination-btn">10</button>
        </div>
      </div>
    </Navbar>
  );
}

export default BlastImage;
