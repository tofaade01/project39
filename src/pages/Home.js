// import React from 'react';
// import Navbar from '../layouts/Navbar';
// import './Home.css'; // For custom styles
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// function Home() {
//   return (
//     <Navbar>
//       <div className="home-container">
//         {/* Top Message Section */}
//         <div className="top-message">
//           <h1>Boost your social life, blast it anywhere in one-click away!</h1>
//           <p>Set up a new template according to your needs with our cool features.</p>
//         </div>

//         {/* Remaining Quota Section */}
//         <div className="quota-section">
//           <div className="quota-card call-quota">
//             <h3>Call Quota</h3>
//             <h2>1,009,040</h2>
//             <p>All content</p>
//           </div>
//           <div className="quota-card video-quota">
//             <h3>Video Quota</h3>
//             <h2>123,001</h2>
//             <p>Video Content</p>
//           </div>
//           <div className="quota-card photo-quota">
//             <h3>Photo Quota</h3>
//             <h2>112,001</h2>
//             <p>Photo Content</p>
//           </div>
//           <div className="quota-card text-quota">
//             <h3>Text Quota</h3>
//             <h2>131,001</h2>
//             <p>Text Content</p>
//           </div>
//         </div>
//         <div className="success-rate-section">
//           <div className="success-card">
//             <h3>CALL</h3>
//             <p>Total Success: 987,009</p>
//             <div className="rate-circle">
//             <CircularProgressbar
//                 value={90}
//                 text={`${90}%`}
//                 styles={buildStyles({
//                   pathColor: `#4CAF50`,
//                   textColor: '#333',
//                   trailColor: '#ddd',
//                 })}
//               />
//             </div>
//           </div>
//           <div className="success-card">
//             <h3>Video</h3>
//             <p>Total Success: 789,009</p>
//             <div className="rate-circle">
//             <CircularProgressbar
//                 value={75}
//                 text={`${75}%`}
//                 styles={buildStyles({
//                   pathColor: `#4CAF50`,
//                   textColor: '#333',
//                   trailColor: '#ddd',
//                 })}
//               />
//             </div>
//           </div>
//           <div className="success-card">
//             <h3>Photo</h3>
//             <p>Total Success: 600,281</p>
//             <div className="rate-circle">
//             <CircularProgressbar
//                 value={80}
//                 text={`${80}%`}
//                 styles={buildStyles({
//                   pathColor: `#4CAF50`,
//                   textColor: '#333',
//                   trailColor: '#ddd',
//                 })}
//               />
//             </div>
//           </div>
//           <div className="success-card">
//             <h3>Texting</h3>
//             <p>Total Success: 987,009</p>
//             <div className="rate-circle">
//             <CircularProgressbar
//                 value={75}
//                 text={`${75}%`}
//                 styles={buildStyles({
//                   pathColor: `#4CAF50`,
//                   textColor: '#333',
//                   trailColor: '#ddd',
//                 })}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Recent Broadcast Activities Section */}
//         <div className="broadcast-activities">
//           <h3>Recent Broadcast Activities</h3>
//           <table className="broadcast-table">
//             <thead>
//               <tr>
//                 <th>Campaign Name</th>
//                 <th>Media Campaign</th>
//                 <th>Channel</th>
//                 <th>Total Broadcast</th>
//                 <th>Created Date</th>
//                 <th>Broadcast Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Bulan Berkah</td>
//                 <td>Video</td>
//                 <td>Instagram, TikTok</td>
//                 <td>2,200</td>
//                 <td>06-09-2024 10:00</td>
//                 <td>08-09-2024 10:00</td>
//                 <td>Finish</td>
//               </tr>
//               <tr>
//                 <td>Lorem Ipsum</td>
//                 <td>Lorem Ipsum</td>
//                 <td>Lorem Ipsum</td>
//                 <td>Lorem Ipsum</td>
//                 <td>Lorem Ipsum</td>
//                 <td>Lorem Ipsum</td>
//                 <td>Lorem Ipsum</td>
//               </tr>
//               {/* Add more rows as needed */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </Navbar>
//   );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import BlastService from '../services/blast-service'; // Import the service
import Navbar from '../layouts/Navbar';
import './Home.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Home() {
  const [blasts, setBlasts] = useState([]); // State to store the blasts data
  const [loading, setLoading] = useState(true); // State to handle loading
  useEffect(() => {
    // Fetch the blast data from API when component mounts
    const fetchBlasts = async () => {
      try {
        const data = await BlastService.getAllBlasts(); // Call the service function
        setBlasts(data); // Set the received data to state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error(error.message ? error.message : 'Failed to fetch blasts');
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchBlasts();
  }, []);

  return (
    <Navbar>
      <div className="home-container">
        {/* Top Message Section */}
        <div className="top-message">
          <h1>Boost your social life, blast it anywhere in one-click away!</h1>
          <p>
            Set up a new template according to your needs with our cool
            features.
          </p>
        </div>
        <div className="quota-section">
          <div className="quota-card call-quota">
            <h3>Call Quota</h3>
            <h2>1,009,040</h2>
            <p>All content</p>
          </div>
          <div className="quota-card video-quota">
            <h3>Video Quota</h3>
            <h2>123,001</h2>
            <p>Video Content</p>
          </div>
          <div className="quota-card photo-quota">
            <h3>Photo Quota</h3>
            <h2>112,001</h2>
            <p>Photo Content</p>
          </div>
          <div className="quota-card text-quota">
            <h3>Text Quota</h3>
            <h2>131,001</h2>
            <p>Text Content</p>
          </div>
        </div>
        <div className="success-rate-section">
          <div className="success-card">
            <h3>CALL</h3>
            <p>Total Success: 987,009</p>
            <div className="rate-circle">
              <CircularProgressbar
                value={90}
                text={`${90}%`}
                styles={buildStyles({
                  pathColor: `#4CAF50`,
                  textColor: '#333',
                  trailColor: '#ddd',
                })}
              />
            </div>
          </div>
          <div className="success-card">
            <h3>Video</h3>
            <p>Total Success: 789,009</p>
            <div className="rate-circle">
              <CircularProgressbar
                value={75}
                text={`${75}%`}
                styles={buildStyles({
                  pathColor: `#4CAF50`,
                  textColor: '#333',
                  trailColor: '#ddd',
                })}
              />
            </div>
          </div>
          <div className="success-card">
            <h3>Photo</h3>
            <p>Total Success: 600,281</p>
            <div className="rate-circle">
              <CircularProgressbar
                value={80}
                text={`${80}%`}
                styles={buildStyles({
                  pathColor: `#4CAF50`,
                  textColor: '#333',
                  trailColor: '#ddd',
                })}
              />
            </div>
          </div>
          <div className="success-card">
            <h3>Texting</h3>
            <p>Total Success: 987,009</p>
            <div className="rate-circle">
              <CircularProgressbar
                value={75}
                text={`${75}%`}
                styles={buildStyles({
                  pathColor: `#4CAF50`,
                  textColor: '#333',
                  trailColor: '#ddd',
                })}
              />
            </div>
          </div>
        </div>
        {/* Recent Broadcast Activities Section */}
        <div className="broadcast-activities">
          <h3>Recent Broadcast Activities</h3>
          {loading ? (
            <p>Loading...</p>
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
                {blasts.map((blast) => (
                  <tr key={blast.id}>
                    <td>{blast.caption}</td>
                    <td>
                      {blast.media.charAt(0).toUpperCase() +
                        blast.media.slice(1)}
                    </td>
                    <td>{blast.channel.join(', ')}</td>
                    <td>{blast.totalBroadcast}</td>
                    <td>{new Date(blast.createdDate).toLocaleDateString()}</td>
                    <td>{new Date(blast.date).toLocaleDateString()}</td>
                    <td>{blast.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Navbar>
  );
}

export default Home;
