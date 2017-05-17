const express = require('express');
const uuidV1 = require('uuid/v1');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = process.env.PORT || 5000;

const {
  USER_JOINS, USER_LEAVES,
  MESSAGE_SENT, MESSAGE_RECEIVED,
  USER_NAME_CHANGED
} = require('./src/actionTypes.js');

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('dist'))
  .listen(PORT, '0.0.0.0', 'localhost');

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

function broadcast(message, ignoreClient) {
  const packet = JSON.stringify(message);
  wss.clients
    .forEach(client => {
      if(client.readyState !== WebSocket.OPEN || (ignoreClient && ignoreClient === client)) return;
      console.log('Broadcasting ', packet);
      client.send(packet);
    });
}

const colors = ['#4286f4', '#37e855', '#ef6c26', '#d820ba'];
let connectionID = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// We then loop through the clients and send out incoming messages to each
wss.on('connection', client => {
  client.data = {
    username: "Anonymous",
    color: colors[++connectionID % colors.length],
    id: uuidV1(),
  };

  console.log(`User ${client.data.id} connected`);

  wss.clients.forEach(({ data }) => {
    const payload = Object.assign({}, data, { me: data.id === client.data.id });
    client.send(JSON.stringify({ type: USER_JOINS, payload }));
  });

  broadcast({ type: USER_JOINS, payload: client.data }, client);

  client.on('message', (message) => {
    const { type, payload } = JSON.parse(message);
    const id = uuidV1();
    const { username, color } = client.data;

    switch(type) {
      case MESSAGE_SENT:
        broadcast({ type: MESSAGE_RECEIVED, payload: Object.assign({}, payload, { type: 'message', id, username, color }) });
        break;
      case USER_NAME_CHANGED: {
        const { id, username: oldUsername } = client.data;
        const { newUsername } = payload;
        client.data.username = newUsername;
        broadcast({ type, payload: { id, oldUsername, newUsername }});
        break;
      }
      default:
        console.info(type, payload);
    }

  });


  // Set up a callback for when a client closes the socket.
  // This usually means they closed their browser.
  // TODO: on close, reduce the online user count accordingly
  client.on('close', () => {
    console.log('Client disconnected');
    broadcast({ type: USER_LEAVES, payload: client.data });
  });
});

