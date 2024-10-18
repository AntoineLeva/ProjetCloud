import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import Messages from './components/Messages';
import PostMessage from './components/PostMessage';
import { userPool } from './config/cognitoConfig';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (err) {
          console.error('Error fetching session:', err);
        } else {
          setUser(session.getIdToken().getJwtToken());
        }
      });
    }
  }, []);

  const handleLogin = (token) => {
    setUser(token);
  };

  const handleLogout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    setUser(null);
  };

  const handleMessagePosted = () => {
    window.location.reload();
  };

  return (
    <div>
      {!user ? (
        <>
          <SignUp />
          <Login onLogin={handleLogin} />
        </>
      ) : (
        <>
          <h1>Bienvenue, utilisateur connecté !</h1>
          <PostMessage user={user} onMessagePosted={handleMessagePosted} />
          <Messages channelId="astra" />
          <Logout onLogout={handleLogout} />
        </>
      )}
    </div>
  );
}

export default App;
