import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
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
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

const users = [
  {
    id: 1,
    userName: 'WazirX',
    password: 'Admin',
    role: 'RE'
  },
  {
    id: 2,
    userName: 'Binance',
    password: 'Admin',
    role: 'RE'
  },
  {
    id: 4,
    userName: 'MudreX',
    password: 'Admin',
    role: 'RE'
  },
  {
    id: 3,
    userName: 'fiu',
    password: 'Admin',
    role: 'FIU'
  }
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isRERoute = location.pathname.startsWith('/re-');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/login');
  };

  return (
    <div>
      <div className='wireframe-section'>
        <span>Application Wire Frame(Prototype)</span>
      </div>

      <div className="appcontainer">

        {loggedInUser !== null ? (
          <>
            <div className="leftPanel">
              <ul>
                {loggedInUser?.role === 'RE' ? (
                  <>
                    <li>Welconse {loggedInUser?.userName}! ({loggedInUser?.role})</li>
                    <li className={location.pathname === '/re-inbox' ? 'active' : ''}>
                      <Link to="/re-inbox">Inbox</Link>
                    </li>
                    <li className={location.pathname === '/re-outbox' ? 'active' : ''}>
                      <Link to="/re-outbox">Outbox</Link>
                    </li>
                    <li className={location.pathname === '/profile' ? 'active' : ''}>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link onClick={handleLogout}>Logout</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>Welconse {loggedInUser?.userName}! ({loggedInUser?.role})</li>
                    <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className={location.pathname === '/inbox' ? 'active' : ''}>
                      <Link to="/inbox">Inbox</Link>
                    </li>
                    <li className={location.pathname === '/outbox' ? 'active' : ''}>
                      <Link to="/outbox">Outbox</Link>
                    </li>
                    <li className={location.pathname === '/profile' ? 'active' : ''}>
                      <Link to="/archived-requests">Archived Requests</Link>
                    </li>
                    <li className={location.pathname === '/profile' ? 'active' : ''}>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link onClick={handleLogout}>Logout</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="rightPanel">
              <Routes>
                <Route path="/inbox" element={<Inbox loggedInUser={loggedInUser} />} />
                <Route path="/outbox" element={<Outbox loggedInUser={loggedInUser} archived="false" />} />
                <Route path="/dashboard" element={<Dashboard loggedInUser={loggedInUser} />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/fiuhome" element={<FiuHome />} />
                <Route path="/fiu-raise-request" element={<FIURaiseRequest loggedInUser={loggedInUser} />} />
                <Route path="/preview/:id" element={<Preview loggedInUser={loggedInUser} />} />
                <Route path="/re-priview/:id" element={<RETakeActions loggedInUser={loggedInUser} />} />
                <Route path="/re-inbox" element={<REInbox loggedInUser={loggedInUser} />} />
                <Route path="/re-outbox" element={<REOutbox loggedInUser={loggedInUser} />} />
                <Route path="/archived-requests" element={<Outbox loggedInUser={loggedInUser} archived="true" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Login users={users} setLoggedInUser={setLoggedInUser} />
        )}
      </div>
    </div>
  );
}

export default App;