import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './REInbox.css';

const REInbox = ({ loggedInUser }) => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [closedRequestsCount, setClosedRequestsCount] = useState(0);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const pendingRequests = storedRequests.filter(
      (req) =>
        req.selectedREs.some(re => re.reName === loggedInUser.userName) &&
        req.action_on && req.action_on.includes(loggedInUser.userName)
    );
    const closedRequests = storedRequests.filter(
      (req) =>
        req.selectedREs.some(re => re.reName === loggedInUser.userName) &&
        (!req.action_on || !req.action_on.includes(loggedInUser.userName))
    );

    setRequests(pendingRequests);
    setFilteredRequests(pendingRequests);
    setPendingRequestsCount(pendingRequests.length);
    setClosedRequestsCount(closedRequests.length);
  }, [loggedInUser.userName]);

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
        <div className="pending-requests">
          <h3>Pending Requests: {pendingRequestsCount}</h3>
        </div>
        <div className="closed-requests">
          <h3>Closed Requests: {closedRequestsCount}</h3>
        </div>
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
            <th>Req ID</th>
            <th>Requested By</th>
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
                <b>FIU_{req.id}</b>
              </td>
              <td>{req.username}</td>
              <td>{req.priority}</td>
              <td>{req.endDate}</td>
              <td>
                <Link to={`/re-priview/${req.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default REInbox;