import React from 'react';

import Message from './message.js';

export default function MessageList({ messages }) {
  return (
    <div className="messages">
      { messages.map(message => <Message key={message.id} {...message} />) }
    </div>
  );
}
