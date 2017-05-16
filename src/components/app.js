import React, { Component } from 'react';

import ChatBar from './chatbar.js';
import MessageList from './messagelist.js';

export default class App extends Component {
  state = {
    currentUser: {
      username: 'Bob'
    },
    messages: [],
    userCount: 0,
    online: false
  }

  componentDidMount() {
    const { hostname, port } = location;
    this.socket = new WebSocket(`ws://${hostname}:${port}/`);
    this.socket.onopen = this.onSocketOpen;
    this.socket.onclose = this.onSocketClose;
    this.socket.onmessage = this.onSocketMessage;
    this.socket.onerror = this.onSocketError;
  }

  componentWillUnmount() {
    this.socket.close();
    delete this.socket;
  }

  render() {
    const { onNewMessage, onNewUsername, state: { currentUser: { username }, messages, userCount, online } } = this;

    const chatBarProps     = { username, onNewMessage, onNewUsername, online };
    const messageListProps = { messages };

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">ChattyApp</a>
          <img src="//freeiconshop.com/wp-content/uploads/edd/chat-alt-outline.png" className="icon"/>
          <div className='user-count'>
            <p>{userCount} users online.</p>
          </div>
        </nav>
        <MessageList {...messageListProps} />
        <ChatBar {...chatBarProps} />
      </div>
    );
  }

  send(message) {
    const payload = this.createMessage(message);

    this.socket.send(JSON.stringify(payload));
  }

  createMessage(content) {
    const { currentUser: { username } } = this.state;
    const type = "postMessage";
    return ({
      username,
      type,
      content
    });
  }

  handlers = {
    usersCount: ({ usersOnline }) => this.setState({ userCount: usersOnline}),
    incomingMessage: ({ username, content, id, color }) => {
      this.setState({ messages: [...this.state.messages, { username, content, id, color }] });
    }
  }


  onNewMessage    = (message)  => { this.send(message); }
  onNewUsername   = (username) => { this.setState({ currentUser: { username } }); }
  onSocketOpen    = (e)        => { this.setState({ online: true }); }
  onSocketClose   = (e)        => { this.setState({ online: false }); }
  onSocketMessage = (message)  => {
    const payload = JSON.parse(message.data);
    if(this.handlers[payload.type]) {
      this.handlers[payload.type](payload);
    } else {
      console.info('Could not handle', payload);
    }
  }
  onSocketError   = (error)    => { console.error(error); }
}
