import React, { Component } from 'react';

import Message from './message.js';

export default class MessageList extends Component {
  render() {
    const { messages } = this.props;
    return (
      <div className="messages">
        { messages.map(message => <Message key={message.id} {...message} />) }
      </div>
    );
  }
}
