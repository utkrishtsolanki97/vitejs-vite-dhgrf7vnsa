import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Inbox.css';

const Inbox = ({ loggedInUser }) => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [raisedRequestsCount, setRaisedRequestsCount] = useState(0);
  const [closedRequestsCount, setClosedRequestsCount] = useState(0);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const userRequests = storedRequests.filter(request =>
      request.action_on && request.action_on.includes(loggedInUser?.userName)
    );
    console.log(loggedInUser?.userName,storedRequests.map(req => req.action_on))
    setRequests(userRequests);
    setFilteredRequests(userRequests);
    setRaisedRequestsCount(storedRequests.length);
    setClosedRequestsCount(
      storedRequests.filter((req) => req.close_request === 1 && req.username=== loggedInUser?.userName).length
    );
  }, [loggedInUser]);

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
      {/* <div className="request-counts">
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
      </div> */}
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
            <th>Priority</th>
            <th>RE Type (Count of Requested RE's)</th>
            <th>Pending RE</th>
            <th>Action Taken RE</th>
            <th>End Date</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((req, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{`FIU Notice ${req.selectedAction}`}</td>
              <td>
                <b>{req.id}</b>
              </td>
              <td>{req.priority}</td>
              <td>{`${req.selectedReType} (${req.selectedREs.length})`}</td>
              <td>{req.selectedREs.filter(re => !re.reply).map(re=> re.name)}</td>
              <td>{req.selectedREs.filter(re => re.reply).map(re=> re.name)}</td>
              <td>{req.endDate}</td>
              <td>
                <Link to={`/preview/${req.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inbox;