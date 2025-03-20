import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Inbox from './Pages/Inbox';
import FiuHome from './Pages/FiuHome';
import FIURaiseRequest from './Pages/FIURaiseRequest';
import Preview from './Pages/Priview';
import RETakeActions from './Pages/RETakeActions';
import REInbox from './Pages/ReInbox';
import REOutbox from './Pages/REOutbox';
import Outbox from './Pages/Outbox';
import Profile from './Pages/Profile';

function App() {
  const location = useLocation();
  const isRERoute = location.pathname.startsWith('/re-');

  return (
    <div className="appcontainer">
      <div className="leftPanel">
        <ul>
          {isRERoute ? (
            <>
              <li>
                <Link to="/re-inbox">Inbox</Link>
              </li>
              <li>
                <Link to="/re-outbox">Outbox</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/inbox">Inbox</Link>
              </li>
              <li>
                <Link to="/outbox">Outbox</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/re-inbox">RE Dashboard</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="rightPanel">
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/outbox" element={<Outbox />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fiuhome" element={<FiuHome />} />
          <Route path="/fiu-raise-request" element={<FIURaiseRequest />} />
          <Route path="/preview/:id" element={<Preview />} />
          <Route path="/re-priview/:id" element={<RETakeActions />} />
          <Route path="/re-inbox" element={<REInbox />} />
          <Route path="/re-outbox" element={<REOutbox />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
