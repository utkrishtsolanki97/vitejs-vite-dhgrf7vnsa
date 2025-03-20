import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Inbox.css';

const Inbox = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [raisedRequestsCount, setRaisedRequestsCount] = useState(0);
  const [closedRequestsCount, setClosedRequestsCount] = useState(0);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    setRequests(storedRequests);
    setFilteredRequests(storedRequests);
    setRaisedRequestsCount(storedRequests.length);
    setClosedRequestsCount(
      storedRequests.filter((req) => req.closed_request === 1).length
    );
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = requests.filter(
      (req) =>
        req.description.toLowerCase().includes(term) ||
        req.selectedAction.toLowerCase().includes(term)
    );
    setFilteredRequests(filtered);
  };

  return (
    <div className="inbox">
      <h1>Inbox</h1>
      <div className="request-counts">
        <div className="raised-requests">
          <h3>Raised Requests: {raisedRequestsCount}</h3>
        </div>
        <div className="closed-requests">
          <h3>Closed Requests: {closedRequestsCount}</h3>
        </div>
      </div>
      <div className="raise-request-button">
        <Link to="/fiu-raise-request" className="raise-request-link">
          Raise A New Request
        </Link>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by description or action"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="requests-table">
        <thead>
          <tr>
            <th>Srl No.</th>
            <th>Title</th>
            <th>Req Id</th>
            <th>Req By</th>
            <th>Priority</th>
            <th>ETA (End Date)</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((req, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{`FIU Notice ${req.selectedAction}`}</td>
              <td>
                <b>FIU_{index + 1}</b>
              </td>
              <td>System</td>
              <td>{req.priority}</td>
              <td>{req.endDate}</td>
              <td>
                <Link to={`/preview/${index}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inbox;
