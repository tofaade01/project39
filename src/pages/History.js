import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBroadcastHistory } from '../redux/blastStore'; // Import the getAllBlasts action
import Navbar from '../layouts/Navbar';
import './History.css'; // Import a CSS file for custom styling
import { format } from 'date-fns';
import frame2 from '../images/Frame2.svg';
import Pagination from '../layouts/Pagination';
function History() {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector((state) => state.blast); // Get state from blastSlice
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    dispatch(getBroadcastHistory());
  }, [dispatch]);
  const hist = Array.isArray(history)
    ? history.filter((h) => h.status === 'Finish')
    : [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hist.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Navbar>
      <div className="history-page">
        <div className="header-section">
          <h1>Let's take a look on your journey</h1>
          <img
            src={frame2} // Replace with actual image path
            alt="Journey Illustration"
            className="journey-illustration"
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-section">
            <h2>History Broadcast Activities</h2>
            {error ? (
              <p className="error-message">{error}</p>
            ) : (
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
                  {Array.isArray(currentItems) ? (
                    currentItems.map((blast) => (
                      <tr key={blast._id}>
                        <td>{blast.title}</td>
                        <td>{blast.media}</td>
                        <td>
                          {Array.isArray(blast.channel)
                            ? blast.channel.join(', ')
                            : blast.channel}
                        </td>
                        <td>
                          {new Date(blast.createdDate).toLocaleDateString()}
                        </td>
                        <td>
                          {format(new Date(blast.date), 'yyyy-MM-dd HH:mm')}
                        </td>
                        <td>{blast.status}</td>
                      </tr>
                    ))
                  ) : (
                    <p>No Broadcast Histories Found</p>
                  )}
                </tbody>
              </table>
            )}
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={hist.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </Navbar>
  );
}

export default History;
