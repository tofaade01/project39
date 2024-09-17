import React, { useState } from 'react';
import Navbar from '../layouts/Navbar';
import './Blastform.css';
import BlastService from '../services/blast-service';
import { useNavigate } from 'react-router-dom';
function BlastForm() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [mediaType, setMediaType] = useState('photos'); // Default to photos
  const [channels, setChannels] = useState([]); // Store selected channels
  const [schedule, setSchedule] = useState('');
  const [totalBroadcast, setTotalBroadcast] = useState(1); // Example field for the total broadcast count
  const navigate = useNavigate();
  // Handle checkbox changes for channels
  const handleChannelChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setChannels([...channels, value]);
    } else {
      setChannels(channels.filter((channel) => channel !== value));
    }
  };

  // Handle form submission to POST the data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload to send to the backend
    const payload = {
      title,
      caption,
      channel: channels,
      date: new Date(schedule).toISOString(),
      media: mediaType,
      time: new Date(schedule).toLocaleTimeString(), // Extract time
      totalBroadcast,
    };
    console.log(payload.media);
    try {
      const response = await BlastService.createBlast(payload);
      alert('Blast created successfully!');
      navigate('/');
      console.log('Response:', response);
    } catch (error) {
      console.error('Error creating blast:', error);
      alert('Failed to create blast.');
    }
  };

  return (
    <div>
      <Navbar>
        <div className="container">
          <h1 className="form-title">CREATE NEW BLAST TODAY</h1>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                maxLength="100"
                placeholder="Type title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Caption */}
            <div className="form-group">
              <label htmlFor="caption">Caption</label>
              <textarea
                id="caption"
                maxLength="300"
                placeholder="Type caption"
                className="form-control"
                rows="3"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              ></textarea>
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
                  />{' '}
                  Photos
                </label>
                <label>
                  <input
                    type="radio"
                    name="mediaType"
                    value="video"
                    checked={mediaType === 'video'}
                    onChange={() => setMediaType('video')}
                  />{' '}
                  Video
                </label>
                <label>
                  <input
                    type="radio"
                    name="mediaType"
                    value="text"
                    checked={mediaType === 'text'}
                    onChange={() => setMediaType('text')}
                  />{' '}
                  Text
                </label>
              </div>
              <div className="media-upload">
                <div className="upload-box">
                  <input type="file" id="mediaUpload" className="file-input" />
                  <label htmlFor="mediaUpload" className="upload-label">
                    Drag files or browse files
                  </label>
                </div>
              </div>
            </div>

            {/* Channel Blasting */}
            <div className="form-group">
              <label>Channel Blasting</label>
              <div className="channel-options">
                <label>
                  <input
                    type="checkbox"
                    value="TikTok"
                    onChange={handleChannelChange}
                  />{' '}
                  TikTok
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Instagram"
                    onChange={handleChannelChange}
                  />{' '}
                  Instagram
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="X"
                    onChange={handleChannelChange}
                  />{' '}
                  X
                </label>
              </div>
            </div>

            {/* Scheduling Blasting */}
            <div className="form-group">
              <label>Scheduling Blasting</label>
              <div className="scheduling">
                <input
                  type="datetime-local"
                  id="scheduleDateTime"
                  className="form-control"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </div>
            </div>

            {/* Total Broadcast (Example) */}
            <div className="form-group">
              <label htmlFor="totalBroadcast">Total Broadcast</label>
              <input
                type="number"
                id="totalBroadcast"
                className="form-control"
                value={totalBroadcast}
                onChange={(e) => setTotalBroadcast(e.target.value)}
                min="1"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Create Blast
            </button>
          </form>
        </div>
      </Navbar>
    </div>
  );
}

export default BlastForm;
