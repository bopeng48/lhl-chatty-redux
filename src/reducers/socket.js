import { SOCKET_CONNECTED, SOCKET_DISCONNECTED, SOCKET_ERROR } from '../actionTypes.js';

export const socketReducer = (state = { connected: false }, { type, payload }) => {
  switch(type) {
    case SOCKET_CONNECTED:
      return { ...state, connected: true };
    case SOCKET_DISCONNECTED:
      return { ...state, connected: false };
  }
  return state;
};
