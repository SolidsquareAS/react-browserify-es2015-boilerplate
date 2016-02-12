import {ADD_TWEET, DELETE_TWEET, DELETE_TWEETS} from './actions';

const tweet = (state, action) => {
  switch (action.type) {
    case ADD_TWEET:
      return {
        id: action.id,
        text: action.text
      };
    case DELETE_TWEET:
      return state.id !== action.id;
    default:
      return state;
  }
};

export const tweets = (state = [], action) => {
  switch (action.type) {
    case ADD_TWEET:
      return [...state, tweet(undefined, action)];
    case DELETE_TWEET:
      return state.filter(t => tweet(t, action));
    case DELETE_TWEETS:
      return [];
    default:
      return state;
  }
};

export default {tweets};
