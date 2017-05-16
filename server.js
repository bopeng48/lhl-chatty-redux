const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 5000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('dist'))
  .listen(PORT, '0.0.0.0', 'localhost');

// Create the WebSockets server
const wss = new SocketServer({ server });

function makeUserCountMessage(usersOnline) {
  const type = 'usersCount';
  return {
    type,
    usersOnline,
  };
}

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

const colors = ['#4286f4', '#37e855', '#ef6c26', '#d820ba'];
let connectionID = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// We then loop through the clients and send out incoming messages to each
wss.on('connection', (ws) => {
  console.log('User connected');
  const userColor = colors[++connectionID % colors.length];
  const userCountMessage = makeUserCountMessage(wss.clients.size.toString());
  broadcast(userCountMessage);
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    parsedMessage.id = uuidV1();
    const imageLinks = parsedMessage.content.match(/(https?:\/\/.*\.(?:png|jpeg|jpg|gif))/i);
    if (imageLinks !== null) {
      parsedMessage.img = imageLinks[1];
    }
    switch (parsedMessage.type) {
      case 'postMessage':
        parsedMessage.type = 'incomingMessage';
        parsedMessage.color = userColor;
        break;
      case 'postNotification':
        parsedMessage.type = 'incomingNotification';
        break;
      default:
        console.error('Unknown message type', parsedMessage.type);
    }
    broadcast(parsedMessage);
  });


  // Set up a callback for when a client closes the socket.
  // This usually means they closed their browser.
  // TODO: on close, reduce the online user count accordingly
  ws.on('close', () => {
    console.log('Client disconnected');
    broadcast(makeUserCountMessage(wss.clients.size));
  });
});

