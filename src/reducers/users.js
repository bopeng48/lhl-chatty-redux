import { filter, propEq } from 'ramda';
import { USER_JOINS, USER_LEAVES, USER_NAME_CHANGED } from '../actionTypes.js';

export const usersReducer = (state = [], { type, payload }) => {
  switch(type) {
    case USER_JOINS:
      return [...state, payload];
    case USER_LEAVES:
      return state.filter(user => user.id !== payload.id);
    case USER_NAME_CHANGED: {
      const { id, newUsername: username } = payload;
      return state.map(user => user.id === id ? { ...user, username } : user);
    }
  }
  return state;
};

export const currentUserReducer = (state = null, { type, payload }) => {
  switch(type) {
    case USER_JOINS: {
      const { me, id } = payload;
      if(me) return id;
    }
  }
  return state;
};

