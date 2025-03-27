import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = ({ users, setLoggedInUser }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(userName,password,typeof(users));
    const user = typeof(users)==='object' ? users.find(
      (user) => user.userName === userName && user.password === password
    ) : null ;
    if (user) {
      setLoggedInUser(user);
      if (user.role==='FIU') {
        navigate('/dashboard');
      }
      else{
        navigate('re-inbox')
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-form">
        <label>Username</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;