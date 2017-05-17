import { MESSAGE_RECEIVED, USER_JOINS, USER_LEAVES } from '../actionTypes.js';

export function messagesReducer(state = [], { type, payload }) {
  switch(type) {
    case MESSAGE_RECEIVED: {
      return [...state, payload];
    }
    case USER_JOINS: {
      const { username } = payload;
      return [...state, { id: state.length, content: `User ${username} has joined`, type: 'notification' }];
    }
    case USER_LEAVES: {
      const { username } = payload;
      return [...state, { id: state.length, content: `User ${username} has left`, type: 'notification' }];
    }
  }
  return state;
}

