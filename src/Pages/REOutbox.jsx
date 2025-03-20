import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './REOutbox.css';

const REOutbox = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const filteredRequests = storedRequests.filter(
      (req) => req.action_taken === 1
    );
    setRequests(filteredRequests);
    setFilteredRequests(filteredRequests);
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
      <h1>Outbox</h1>
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

export default REOutbox;
