import React, { useState } from 'react';

function PostMessage({ user, onMessagePosted }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      channel_id: 'astra',
      Message: message,
    };

    try {
      const response = await fetch('https://be7v3joie6.execute-api.eu-west-1.amazonaws.com/stage-astra/messages', {
        method: 'POST',
        headers: {
          'Authorization': user,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to post message');

      setMessage('');
      setSuccess('Message posted successfully!');
      setError(null);

      onMessagePosted();

    } catch (err) {
      setError(err.message || 'Failed to post message');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Post a new message</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
        />
        <button type="submit">Post</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default PostMessage;
