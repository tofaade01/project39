// eslint-disable-next-line
import React from 'react';
import Navbar from '../layouts/Navbar';
import './Videoblast.css';  // Import the CSS

const VideoBlast = () => {
  const videoData = [
    {
      title: "Bulan Berkah",
      description: "Hidupkan hati, hidupkan sesama. Mari bergabung dalam Program Bulan Berkah...",
      channels: "Youtube, Tiktok",
      broadcastDate: "06-09-2024",
      timeBlast: "10 a.m",
      totalBroadcast: "2,000",
    },
    {
      title: "Start Up Scholarship",
      description: "Quarter life crisis bikin hidup jadi seperti ada di persimpangan...",
      channels: "Youtube, Instagram, Tiktok",
      broadcastDate: "06-09-2024",
      timeBlast: "10 a.m",
      totalBroadcast: "2,000",
    },
  ];

  return (
    <Navbar>
      <div className="video-broadcast-section">
        <h2>Recent Video Content Broadcast Activities</h2>
        <p>Monitor each of your broadcast processes and activities</p>
        <div className="broadcast-card-container">
          {videoData.map((video, index) => (
            <div key={index} className="broadcast-card d-block">
                <div className='row' style={{flexWrap: 'nowrap'}}>
                    <div className='col-md-6'>
                        <div className="broadcast-card-header" style={{width: '200px'}}>
                            <div class="embed-responsive embed-responsive-1by1">
                                <iframe title='video' width={180} height={140} class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="broadcast-info">
                        <div className='col-md-6'>
                            <p><strong>Channel:</strong> {video.channels}</p>
                            <p><strong>Broadcast Date:</strong> {video.broadcastDate}</p>
                            <p><strong>Time Blast:</strong> {video.timeBlast}</p>
                            <p><strong>Total Broadcast:</strong> {video.totalBroadcast}</p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <h4>{video.title}</h4>
                        <p>{video.description}(selengkapnya)</p>
                    </div>
                </div>
              <div className="broadcast-actions justify-content-end">
                <div className='row'>
                    <div className='col-md-12'>
                        <button className="cancel-button m-1">Cancel</button>
                        <button className="blast-button">Blast Now</button>
                    </div>
                </div>
                <div className="edit-icon">
              <i className="fas fa-pen"></i>
            </div>
            </div>
        </div>
          ))}
        </div>
      </div>
    </Navbar>
  );
};

export default VideoBlast;
