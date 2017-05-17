import { socketConnected, socketDisconnected, socketError } from '../actions';

export const defaultPrefix = "socket/";

const webSocketMiddleware = (url, prefix = defaultPrefix) => {
  const socket = new WebSocket(url);
  return ({ dispatch }) => {
    socket.onmessage = message => {
      const data = JSON.parse(message.data);
      if(data.type && data.payload) {
        dispatch(data);
      } else {
        console.info('Received a payload from a socket that does not look like an action', data);
      }
    };
    socket.onopen = (e) => dispatch(socketConnected(e));
    socket.onclose = (e) => dispatch(socketDisconnected(e));
    socket.onerror = (e) => dispatch(socketError(e));

    return next => (action) => {
      const { type, payload } = action;
      // Check if type calls for the payload to be routed via socket
      if(type.indexOf(prefix) === 0) {
        const packet = JSON.stringify({
          type: type.slice(prefix.length), // strip prefix
          payload
        });
        socket.send(packet);
      }
      return next(action);
    }
  }
};

export default webSocketMiddleware;

export const socketAction = (fn) => (...args) => {
  const { type, payload } = fn(...args);
  return {
    type: defaultPrefix + type,
    payload
  };
};
