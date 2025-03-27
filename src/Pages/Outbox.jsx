import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Inbox.css';

const Outbox = ({ loggedInUser,archived }) => {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    console.log(archived,archived === 'true');
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const userRequests = archived === 'true' ? storedRequests.filter(request =>
      request.username === loggedInUser.userName && 
      ( request.close_request===1)
    ) : storedRequests.filter(request =>
      request.username === loggedInUser.userName && 
      (!request.action_on || !request.action_on.includes(loggedInUser.userName)) && 
      (!request.close_request)
    );
    setRequests(userRequests);
    setFilteredRequests(userRequests);
  }, [loggedInUser.userName]);

  useEffect(() => {
    console.log(archived,archived === 'true');
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const userRequests = archived === 'true' ? storedRequests.filter(request =>
      request.username === loggedInUser.userName && 
      ( request.close_request===1)
    ) : storedRequests.filter(request =>
      request.username === loggedInUser.userName && 
      (!request.action_on || !request.action_on.includes(loggedInUser.userName)) && 
      (!request.close_request)
    );
    setRequests(userRequests);
    setFilteredRequests(userRequests);
  }, [navigate]);

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
      <h1>{archived==='true' ? 'Acrhived Requests' : 'Outbox'}</h1>
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
                <b>FIU_{req.id}</b>
              </td>
              <td>{req.priority}</td>
              <td>{`${req.selectedReType} (${req.selectedREs.length})`}</td>
              <td>{req.selectedREs.filter(re => !re.reply).length}</td>
              <td>{req.selectedREs.filter(re => re.reply).length}</td>
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

export default Outbox;