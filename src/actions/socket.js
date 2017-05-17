import { SOCKET_CONNECTED, SOCKET_ERROR, SOCKET_DISCONNECTED } from '../actionTypes.js';

export const socketConnected    = (e)     => ({ type: SOCKET_CONNECTED   , payload: e });
export const socketDisconnected = (e)     => ({ type: SOCKET_DISCONNECTED, payload: e });
export const socketError        = (error) => ({ type: SOCKET_ERROR       , payload: error });
