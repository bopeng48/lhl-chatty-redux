import React from 'react';

const getClassNameByType = (type) => {
  switch(type) {
    case "postMessage":
      return "message";
    case "postNotification":
      return "notification";
  }
}

export default function Message({ type, username, content, color }) {
  return (
    <div className={getClassNameByType(type)}>
      { username ? <span className="message-username" style={{ color }}>{ username }</span> : null }
      <span className="message-content">{ content }</span>
    </div>
  );
}
