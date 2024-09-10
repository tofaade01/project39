// eslint-disable-next-line
import React from 'react';
import Navbar from '../layouts/Navbar';

const TextBlast = () => {
  const textData = [
    {
      title: "Hiduplah Seperti Larry",
      description: "Apa yang kita miliki di dunia ini bersifat sementara lorem ipsum...",
      hashtags: "#menggegerkan #trending #bestmentees #pejuangdeadline",
      channels: "Youtube, Tiktok",
      broadcastDate: "06-09-2024",
      timeBlast: "10 a.m",
      totalBroadcast: "2,000",
    },
    {
      title: "Ketika Hidup Tak Sesuai Ekspektasi",
      description: "Bila kuingat masa Ayah Bunda, Bunda piara piara akan daku...",
      hashtags: "#hidupindalahlikesempatan #jalaninnyaiku #pesanimembuatlapar",
      channels: "Youtube, Tiktok",
      broadcastDate: "06-09-2024",
      timeBlast: "10 a.m",
      totalBroadcast: "2,000",
    },
    // More text data...
  ];

  return (
    <Navbar>
    <div className="text-broadcast-section">
      <h2>Recent Texting Content Broadcast Activities</h2>
      <p>Monitor each of your broadcast processes and activities</p>
      <div className="broadcast-card-container">
        {textData.map((text, index) => (
          <div key={index} className="broadcast-card d-block">
            <div className="broadcast-card-header">
              <h3>{text.title}</h3>
              <p>{text.description}(selengkapnya)</p>
              <p className="hashtags">{text.hashtags}</p>
            </div>
            <div className="broadcast-info" style={{display: 'grid', gridTemplateColumns:'repeat(2, 1fr)'}}>
              <p><strong>Channel:</strong> {text.channels}</p>
              <p><strong>Broadcast Date:</strong> {text.broadcastDate}</p>
              <p><strong>Time Blast:</strong> {text.timeBlast}</p>
              <p><strong>Total Broadcast:</strong> {text.totalBroadcast}</p>
            </div>
            <div className="broadcast-actions justify-content-end">
                <div className='test'>
                    <button className="cancel-button m-1">Cancel</button>
                    <button className="blast-button">Blast Now</button>
              </div>
            </div>
            <div className="edit-icon">
              <i className="fas fa-pen"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Navbar>
  );
};

export default TextBlast;
