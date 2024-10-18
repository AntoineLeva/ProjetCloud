import React, { useState, useEffect } from 'react';

function Messages({ channelId }) {
  const [allMessages, setAllMessages] = useState([]);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messagesToShow, setMessagesToShow] = useState(10);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://be7v3joie6.execute-api.eu-west-1.amazonaws.com/stage-astra/messages');
        const data = await response.json();

        const filteredMessages = data.body.filter(message => message.channel_id === 'astra');
        setAllMessages(filteredMessages);
        setVisibleMessages(filteredMessages.slice(0, messagesToShow));
      } catch (err) {
        console.error("Error fetching messages: ", err);
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [channelId]);

  const loadMoreMessages = () => {
    const nextMessagesToShow = messagesToShow + 10;
    setMessagesToShow(nextMessagesToShow);

    const newVisibleMessages = allMessages.slice(0, nextMessagesToShow);
    setVisibleMessages(newVisibleMessages);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
        loadMoreMessages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [messagesToShow, allMessages]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {visibleMessages.map((message) => (
          <li key={message.MessageId}>
            <p><strong>{message.MessageId}:</strong> {message.Message || "No message content"}</p>
            <p><em>{new Date(message.timestamp_utc_iso8601).toLocaleString()}</em></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;
