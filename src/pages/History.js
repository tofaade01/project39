import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBroadcastHistory } from '../redux/blastStore';
import Navbar from '../layouts/Navbar';
import './History.css';
import { format } from 'date-fns';
import frame2 from '../images/Frame2.svg';
import Pagination from '../layouts/Pagination';

function History() {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector((state) => state.blast);
  const [currentPage, setCurrentPage] = useState(1);
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
          <div style={{ marginTop: '10px' }}>
            <h1
              style={{
                color: '#BA0E44',
                textAlign: 'left',
                fontSize: '26px',
                fontWeight: 'bold',
              }}
            >
              Let's take a look
            </h1>
            <h1
              style={{
                color: '#BA0E44',
                textAlign: 'left',
                fontSize: '26px',
                fontWeight: 'bold',
              }}
            >
              on your journey
            </h1>
          </div>
          <img
            src={frame2}
            alt="Journey Illustration"
            className="journey-illustration"
          />
        </div>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <div className="table-section">
            <h2
              style={{
                color: '#BA0E44',
                textAlign: 'left',
                fontSize: '26px',
                fontWeight: 'bold',
              }}
            >
              History Broadcast Activities
            </h2>
            {error ? (
              <p className="error-message">{error}</p>
            ) : (
              <table className="broadcast-table">
                <thead>
                  <tr>
                    <th
                      style={{
                        color: '#42526E',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Campaign Name
                    </th>
                    <th
                      style={{
                        color: '#42526E',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Media
                    </th>
                    <th
                      style={{
                        color: '#42526E',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Channel
                    </th>
                    <th
                      style={{
                        color: '#42526E',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Created Date
                    </th>
                    <th
                      style={{
                        color: '#42526E',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Broadcast Date
                    </th>
                    <th
                      style={{
                        color: '#42526E',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(currentItems) ? (
                    currentItems.map((blast) => (
                      <tr key={blast._id}>
                        <td
                          style={{
                            color: '#A7A9AC',
                            textAlign: 'left',
                            fontSize: '12px',
                          }}
                        >
                          {blast.title}
                        </td>
                        <td
                          style={{
                            color: '#A7A9AC',
                            textAlign: 'left',
                            fontSize: '12px',
                          }}
                        >
                          {blast.media}
                        </td>
                        <td
                          style={{
                            color: '#A7A9AC',
                            textAlign: 'left',
                            fontSize: '12px',
                          }}
                        >
                          {Array.isArray(blast.channel)
                            ? blast.channel.join(', ')
                            : blast.channel}
                        </td>
                        <td
                          style={{
                            color: '#A7A9AC',
                            textAlign: 'left',
                            fontSize: '12px',
                          }}
                        >
                          {new Date(blast.createdDate).toLocaleDateString()}
                        </td>
                        <td
                          style={{
                            color: '#A7A9AC',
                            textAlign: 'left',
                            fontSize: '12px',
                          }}
                        >
                          {format(new Date(blast.date), 'yyyy-MM-dd HH:mm')}
                        </td>
                        <td
                          style={{
                            color: '#A7A9AC',
                            textAlign: 'left',
                            fontSize: '12px',
                          }}
                        >
                          {blast.status}
                        </td>
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
