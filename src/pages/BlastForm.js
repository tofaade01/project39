import React, { useState } from 'react';
import Navbar from '../layouts/Navbar';
import './Blastform.css';
function BlastForm() {
  const [mediaType, setMediaType] = useState('photos'); // Default to photos

  return (
    <div>
      <Navbar>
        <div className="container">
          <h1 className="form-title">CREATE NEW blast today</h1>
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title (optional)</label>
            <input type="text" id="title" maxLength="100" placeholder="Type title" className="form-control" />
          </div>

          {/* Caption */}
          <div className="form-group">
            <label htmlFor="caption">Caption</label>
            <textarea id="caption" maxLength="300" placeholder="Type caption" className="form-control" rows="3"></textarea>
          </div>

          {/* Media */}
          <div className="form-group">
            <label>Media (optional to upload your image or video here)</label>
            <div className="media-toggle">
              <label>
                <input 
                  type="radio" 
                  name="mediaType" 
                  value="photos" 
                  checked={mediaType === 'photos'} 
                  onChange={() => setMediaType('photos')} 
                /> Photos
              </label>
              <label>
                <input 
                  type="radio" 
                  name="mediaType" 
                  value="video" 
                  checked={mediaType === 'video'} 
                  onChange={() => setMediaType('video')} 
                /> Video
              </label>
            </div>
            <div className="media-upload">
              <div className="upload-box">
                <input type="file" id="mediaUpload" className="file-input" />
                <label htmlFor="mediaUpload" className="upload-label">Drag files or browse files</label>
              </div>
            </div>
          </div>

          {/* Channel Blasting */}
          <div className="form-group">
            <label>Channel Blasting</label>
            <div className="channel-options">
              <label><input type="checkbox" /> TikTok Photos</label>
              <label><input type="checkbox" /> Instagram Feeds</label>
              <label><input type="checkbox" /> X</label>
            </div>
          </div>

          {/* Scheduling Blasting */}
          <div className="form-group">
            <label>Scheduling Blasting</label>
            <div className="scheduling">
              <input type="date" id="scheduleDate" className="form-control" defaultValue="2024-09-10" />
              <input type="time" id="scheduleTime" className="form-control" defaultValue="10:00" />
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default BlastForm;
