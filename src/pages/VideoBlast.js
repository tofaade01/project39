import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBlasts,
  blastNow,
  editBlast,
  deleteBlast,
} from '../redux/blastStore'; // API call
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import './Videoblast.css'; // Reuse the same styling as BlastImage
import Pagination from '../layouts/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function VideoBlast() {
  const [showFullText, setShowFullText] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const characterLimit = 100;
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [itemsPerPage] = useState(4);
  const [editModalOpen, setEditModalOpen] = useState(false); // State to control edit modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State to control delete modal
  const [currentBlast, setCurrentBlast] = useState(null); // Store the blast being edited or deleted
  const [formData, setFormData] = useState({});
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  // Get state from Redux store
  const { blasts, loading, error } = useSelector((state) => state.blast);

  // Fetch blasts when the component mounts
  useEffect(() => {
    dispatch(getAllBlasts());
  }, [dispatch]);

  const handleBlastNow = (blasts) => {
    const payload = {
      title: blasts.title,
      caption: blasts.description,
      channel: blasts.channel,
      media: blasts.media,
      date: new Date(blasts.date).toISOString(),
      createdDate: new Date(blasts.createdDate).toISOString(),
      totalBroadcast: blasts.totalBroadcast,
      status: blasts.status,
    };

    dispatch(blastNow(payload))
      .then(() => {
        alert('Blast initiated successfully!');
        navigate('/');
      })
      .catch(() => {
        alert('Failed to initiate blast.');
      });
  };

  // Filter video content
  const videoBlasts = Array.isArray(blasts)
    ? blasts.filter((b) => b.media === 'video' && b.status === 'Pending')
    : [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = videoBlasts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const openEditModal = (blasts) => {
    setCurrentBlast(blasts);
    setFormData({
      id: blasts._id,
      title: blasts.title,
      caption: blasts.caption,
      channel: blasts.channel,
      media: blasts.media,
      date: blasts.date,
      totalBroadcast: blasts.totalBroadcast,
    });
    setEditModalOpen(true);
  };
  const openDeleteModal = (blasts) => {
    setCurrentBlast(blasts);
    console.log(setCurrentBlast(blasts));
    setDeleteModalOpen(true);
  };

  // Handle form changes in the edit modal
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const handleEditSubmit = async () => {
    try {
      dispatch(editBlast({ ...formData }));
      toast.success('Blast updated successfully!');
      setEditModalOpen(false); // Close the modal
      dispatch(getAllBlasts()); // Refresh blasts
    } catch (error) {
      toast.error('Failed to update blast.' + error);
    }
  };

  // Confirm deletion
  const handleDeleteSubmit = () => {
    dispatch(deleteBlast({ id: currentBlast._id }))
      .then(() => {
        toast.success('Blast deleted successfully!');
        setDeleteModalOpen(false); // Close the modal
        dispatch(getAllBlasts()); // Refresh blasts
      })
      .catch(() => {
        toast.error('Failed to delete blast.');
      });
  };
  return (
    <Navbar>
      <div className="upcoming-blast-container">
        <div className="blast-header d-flex flex-column justify-content-start">
          <h2>Recent Video Content Broadcast Activities</h2>
          <p>Monitor each of your broadcast processes and activities</p>
        </div>

        <div className="broadcast-cards-container">
          {Array.isArray(currentItems) ? (
            currentItems.map((blast) => (
              <div key={blast._id} className="broadcast-card">
                <div className="broadcast-video">
                  <iframe
                    title={blast.title}
                    width="180"
                    height="140"
                    src={
                      blast.videoUrl ||
                      'https://www.youtube.com/embed/zpOULjyy-n8?rel=0'
                    }
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="broadcast-details">
                  <h3>{blast.title}</h3>
                  <p>
                    <i className="fas fa-calendar-alt"></i> Broadcast Date:{' '}
                    {new Date(blast.date).toLocaleDateString()} <br />
                    <i className="fas fa-clock"></i> Time Blast:{' '}
                    {new Date(blast.date).toLocaleTimeString()}
                  </p>
                  <p className={showFullText ? 'full-text' : 'truncated-text'}>
                    {showFullText
                      ? blast.caption
                      : blast.caption.substring(0, characterLimit)}
                    {blast.caption.length > characterLimit &&
                      !showFullText &&
                      '...'}
                  </p>
                  {blast.caption.length > characterLimit && (
                    <button className="read-more-btn" onClick={toggleText}>
                      {showFullText ? 'Lebih sedikit' : 'Selengkapnya'}
                    </button>
                  )}
                  <div className="card-buttons d-flex">
                    <button
                      className="cancel-btn"
                      onClick={() => openDeleteModal(blast)}
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="blast-btn"
                      onClick={() => handleBlastNow(blast)}
                    >
                      {loading ? 'Loading...' : 'BLAST NOW'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                  </div>
                </div>
                <div className="edit-icon" onClick={() => openEditModal(blast)}>
                  <i className="fas fa-pen"></i>
                </div>
              </div>
            ))
          ) : (
            <p>No video content found.</p>
          )}
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={videoBlasts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        {editModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Edit Blast</h3>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
              />
              <label>Caption:</label>
              <textarea
                name="caption"
                value={formData.caption}
                onChange={handleFormChange}
              />
              <label>Channel:</label>
              <input
                type="text"
                name="channel"
                value={formData.channel}
                onChange={handleFormChange}
              />
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date.split('T')[0]} // Convert to YYYY-MM-DD format
                onChange={handleFormChange}
              />
              <label>Total Broadcast:</label>
              <input
                type="number"
                name="totalBroadcast"
                value={formData.totalBroadcast}
                onChange={handleFormChange}
                min="1"
              />
              <button onClick={handleEditSubmit}>Save Changes</button>
              <button onClick={() => setEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Are you sure you want to delete this blast?</h3>
              <button onClick={handleDeleteSubmit}>Yes, Delete</button>
              <button onClick={() => setDeleteModalOpen(false)}>Cancel</button>
            </div>
          </div>
        )}
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
  );
}

export default VideoBlast;
