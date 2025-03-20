import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <div className="profile-image">
          <img src="path_to_image.jpg" alt="Profile" />
        </div>
        <div className="profile-info">
          <p>
            <strong>Name:</strong>
          </p>
          <input type="text" value="John Doe" disabled />
          <p>
            <strong>Email:</strong>
          </p>
          <input type="text" value="john.doe@example.com" disabled />
          <p>
            <strong>Phone Number:</strong>
          </p>
          <input type="text" value="+1234567890" disabled />
          <p>
            <strong>Address:</strong>
          </p>
          <input type="text" value="123 Main St, City, Country" disabled />
        </div>
      </div>
    </div>
  );
};

export default Profile;
