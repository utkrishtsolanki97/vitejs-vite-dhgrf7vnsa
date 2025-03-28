import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ loggedInUser }) => {
  const [requests, setRequests] = useState([]);
  const [closedRequests, setClosedRequests] = useState(0);
  const [raisedRequests, setRaisedRequests] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ requestId: '', re: '', reType: '', priority: '' });

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    setClosedRequests(storedRequests.filter(req => req.close_request===1).length);
    setRaisedRequests(storedRequests.length)
    setRequests(storedRequests.filter(req => !req.close_request));
  }, []);

  const getRaisedRequestsCount = () => requests.length;

  const getClosedRequestsCount = () => {
    requests.map(req=> console.log(req.close_request))
    return requests.filter(req => req.close_request === 1).length;
  };

  const getTimeLeft = (endDate) => {
    const endTime = new Date(endDate).getTime();
    const currentTime = new Date().getTime();
    const timeLeft = endTime - currentTime;
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const uniqueRequestIds = [...new Set(requests?.map(req => req.id))];
  const uniqueRes = [...new Set(requests?.flatMap(req => req.selectedREs.map(re => re.name)))];
  const uniqueReTypes = [...new Set(requests?.map(req => req.selectedReType))];
  const uniquePriorities = [...new Set(requests?.map(req => req.priority))];

  const filteredRequests = requests.filter(req => {
    const matchesRequestId = filter.requestId ? req.id === filter.requestId : true;
    const matchesRe = filter.re ? req.selectedREs.some(re => re.name === filter.re) : true;
    const matchesReType = filter.reType ? req.selectedReType === filter.reType : true;
    const matchesPriority = filter.priority ? req.priority === filter.priority : true;
    const matchesSearchTerm = searchTerm
      ? req.id.includes(searchTerm) ||
        req.selectedReType.includes(searchTerm) ||
        req.selectedREs.some(re => re.name.includes(searchTerm)) ||
        req.selectedAction.includes(searchTerm)
      : true;
    return matchesRequestId && matchesRe && matchesReType && matchesPriority && matchesSearchTerm;
  });

  return (
    <div className="fiu-raise-request">
      <div className="header">
        <h1>Dashboard</h1>
      </div>
      <div className="request-counts">
        <div className="raised-requests">
          <h3>Raised Requests: {raisedRequests}</h3>
        </div>
        <div className="closed-requests">
          <h3>Closed Requests: {closedRequests}</h3>
        </div>
      </div>
      <div className="raise-request-button">
        <Link to="/fiu-raise-request" className="raise-request-link">
          Raise A New Request
        </Link>
      </div>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="filters">
          <select
            value={filter.requestId}
            onChange={(e) => setFilter({ ...filter, requestId: e.target.value })}
          >
            <option value="">Select Request ID</option>
            {uniqueRequestIds.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
          <select
            value={filter.re}
            onChange={(e) => setFilter({ ...filter, re: e.target.value })}
          >
            <option value="">Select RE</option>
            {uniqueRes.map(re => (
              <option key={re} value={re}>{re}</option>
            ))}
          </select>
          <select
            value={filter.reType}
            onChange={(e) => setFilter({ ...filter, reType: e.target.value })}
          >
            <option value="">Select RE Type</option>
            {uniqueReTypes.map(reType => (
              <option key={reType} value={reType}>{reType}</option>
            ))}
          </select>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          >
            <option value="">Select Priority</option>
            {uniquePriorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
      </div>
      <table className="requests-table">
        <thead>
          <tr>
            <th>Srl No.</th>
            <th>Title</th>
            <th>Request ID</th>
            <th>Priority</th>
            <th>RE Type</th>
            <th>Action Taken By RE</th>
            <th>Action Pending By RE</th>
            <th>Time Left in Closing the Request</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((req, index) => (
            <tr key={req.id} className={`priority-${req.priority.toLowerCase()}`}>
              <td>{index + 1}</td>
              <td>{`FIU Notice ${req.selectedAction}`}</td>
              <td>{req.id}</td>
              <td>{req.priority}</td>
              <td>{req.selectedReType}</td>
              <td>{req.selectedREs.filter(re => re.reply).map(re => re.name).join(', ')}</td>
              <td>{req.selectedREs.filter(re => !re.reply).map(re => re.name).join(', ')}</td>
              <td>{getTimeLeft(req.endDate)}</td>
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

export default Dashboard;