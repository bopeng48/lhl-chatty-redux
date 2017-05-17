import React, { Component } from 'react';
import { connect } from 'react-redux';

import { socketAction } from '../middlewares/websocket.js';
import { usernameChanged, messageSent } from '../actions';

const mapStateToProps = (state) => ({
  online: state.socket.connected
});

const mapDispatchToProps = {
  usernameChanged: socketAction(usernameChanged),
  messageSent: socketAction(messageSent)
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ChatBar extends Component {
  constructor(props) {
    super(props);
    const { username = "Anonymous" } = props;

    this.state = {
      username,
      message: ""
    }
  }

  onUsernameChanged = ({ target: { value: username } }) => {
    this.setState({ username });
  }

  onMessageChanged  = ({ target: { value: message } }) => {
    this.setState({ message });
  }

  onUsernameKeypress = ({ key }) => {
    if(key !== 'Enter') { return; }

    this.props.usernameChanged(this.props.username, this.state.username);
  }

  onMessageKeypress = ({ key }) => {
    if(key !== 'Enter') { return; }

    this.props.messageSent(this.state.message, this.props.username);
    this.setState({ message: "" });
  }

  get disabled() {
    return !this.props.online;
  }

  render() {
    const {
      onUsernameChanged,
      onUsernameKeypress,
      onMessageChanged,
      onMessageKeypress,
      state: { username, message },
      disabled
    } = this;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"
          value={username}
          onChange={onUsernameChanged}
          onKeyPress={onUsernameKeypress}
          disabled={disabled}
        />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          value={message}
          onChange={onMessageChanged}
          onKeyPress={onMessageKeypress}
          disabled={disabled}
        />
      </footer>
    );
  }
}
