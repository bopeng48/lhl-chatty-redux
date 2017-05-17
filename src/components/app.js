import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatBar from './chatbar.js';
import MessageList from './messagelist.js';

const mapStateToProps = ({ messages, users, socket: { connected }}) => ({
  messages,
  connected,
  userCount: users.length
});

@connect(mapStateToProps)
export default class App extends Component {
  render() {
    const { connected: online, userCount, messages } = this.props;
    return (
      <div>
        <nav className="navbar">
          <a className="navbar-brand">ChattyRedux</a>
          <img src="//freeiconshop.com/wp-content/uploads/edd/chat-alt-outline.png" className="icon"/>
          <div className='user-count'>
            { online ? <p>{userCount} users online.</p> : <p>Server is offline</p> }
          </div>
        </nav>
        <MessageList messages={messages} />
        <ChatBar />
      </div>
    );
  }

  onNewMessage    = (message)  => { this.send(message); }
  onNewUsername   = (username) => { this.setState({ currentUser: { username } }); }
}

