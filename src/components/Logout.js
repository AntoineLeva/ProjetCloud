import React from 'react';
import { userPool } from '../config/cognitoConfig';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      onLogout();
    }
  };

  return <button className="logout-button" onClick={handleLogout}>Logout</button>;
};

export default Logout;
