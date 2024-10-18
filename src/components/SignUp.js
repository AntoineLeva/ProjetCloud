import React, { useState } from 'react';
import { userPool } from '../config/cognitoConfig';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    userPool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        setMessage(`Erreur : ${err.message || JSON.stringify(err)}`);
        return;
      }
      setMessage(`Inscription réussie pour ${result.user.getUsername()}`);
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;