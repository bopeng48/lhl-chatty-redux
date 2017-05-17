import React from 'react';

export default function Message({ type, username, content, color }) {
  return (
    <div className={type}>
      { username ? <span className="message-username" style={{ color }}>{ username }</span> : null }
      <span className="message-content">{ content }</span>
    </div>
  );
}
