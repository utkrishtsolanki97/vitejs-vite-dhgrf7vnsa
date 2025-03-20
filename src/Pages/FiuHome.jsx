import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const FiuHome = () => {
  return (
    <div>
      <Button variant="secondary">
        <Link to="/fiu-raise-request">Raise A Request</Link>
      </Button>
    </div>
  );
};

export default FiuHome;
