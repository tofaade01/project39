import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlasts, blastNow } from '../redux/blastStore'; // API call
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import './textblast.css'; // Reuse the same styling as BlastImage
import Pagination from '../layouts/Pagination';
function TextBlast() {
  const [showFullText, setShowFullText] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const characterLimit = 100;
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [itemsPerPage] = useState(4);
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

  // Filter text content
  const textBlasts = Array.isArray(blasts)
    ? blasts.filter((b) => b.media === 'text' && b.status === 'Pending')
    : [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = textBlasts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Navbar>
      <div className="upcoming-blast-container">
        <div className="blast-header d-flex flex-column justify-content-start">
          <h2>Recent Texting Content Broadcast Activities</h2>
          <p>Monitor each of your broadcast processes and activities</p>
        </div>

        <div className="broadcast-cards-container">
          {Array.isArray(currentItems) ? (
            currentItems.map((blast) => (
              <div key={blast.id} className="broadcast-card">
                <div className="broadcast-details">
                  <h3>{blast.title}</h3>
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
                  <p>
                    <i className="fas fa-calendar-alt"></i> Broadcast Date:{' '}
                    {new Date(blast.date).toLocaleDateString()} <br />
                    <i className="fas fa-clock"></i> Time Blast:{' '}
                    {new Date(blast.date).toLocaleTimeString()}
                  </p>
                  <div className="card-buttons d-flex">
                    <button className="cancel-btn">CANCEL</button>
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
                <div className="edit-icon">
                  <i className="fas fa-pen"></i>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={textBlasts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </Navbar>
  );
}

export default TextBlast;
