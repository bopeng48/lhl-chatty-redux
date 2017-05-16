import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);

    const { username } = props;

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

    this.props.onNewUsername(this.state.username);
  }

  onMessageKeypress = ({ key }) => {
    if(key !== 'Enter') { return; }

    this.props.onNewMessage(this.state.message);
    this.setState({ message: "" });
  }

  render() {
    const { onUsernameChanged, onUsernameKeypress, onMessageChanged, onMessageKeypress, state: { username, message } } = this;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"
          value={username}
          onChange={onUsernameChanged}
          onKeyPress={onUsernameKeypress} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          value={message}
          onChange={onMessageChanged}
          onKeyPress={onMessageKeypress} />
      </footer>
    );
  }
}
