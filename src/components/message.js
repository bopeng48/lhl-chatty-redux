import React from 'react';

export default function Message({ username, content, color }) {
  return (
    <div className="message">
      <span className="message-username" style={{ color }}>{ username }</span>
      <span className="message-content">{ content }</span>
    </div>
  );
}
