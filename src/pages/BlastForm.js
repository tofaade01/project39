import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlast } from '../redux/blastStore'; // Import the createBlast action
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import './Blastform.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BlastForm() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [mediaType, setMediaType] = useState('photos'); // Default to photos
  const [channels, setChannels] = useState([]); // Store selected channels
  const [schedule, setSchedule] = useState('');
  const [totalBroadcast, setTotalBroadcast] = useState(1); // Example field for the total broadcast count

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing loading and error state from Redux
  const { loading, error } = useSelector((state) => state.blast);

  // Handle checkbox changes for channels
  const handleChannelChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setChannels([...channels, value]);
    } else {
      setChannels(channels.filter((channel) => channel !== value));
    }
  };

  // Handle form submission to dispatch the createBlast action
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the payload to send to Redux
    const payload = {
      title,
      caption,
      channel: channels,
      date: new Date(schedule).toISOString(),
      media: mediaType,
      time: new Date(schedule).toLocaleTimeString(), // Extract time
      totalBroadcast,
    };

    // Dispatch the createBlast action
    dispatch(createBlast(payload))
      .then(() => {
        toast.success('Blast created successfully!', {
          onClose: () => navigate('/'),
        });
      })
      .catch(() => {
        toast.error('Failed to create blast.');
      });
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
              <label>Media</label>
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

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Blast'}
            </button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </Navbar>
    </div>
  );
}

export default BlastForm;
