import {createStore} from 'redux';
import {getTweetAction, getTweetDeleteAction, getTweetsDeleteAction} from './actions';
import {tweets} from './reducers';

const store = createStore(tweets);

let tweetIds = 0;

export const addTweet = (text) => {
  store.dispatch(getTweetAction(text, tweetIds++));
};

export const deleteTweet = (id) => {
  store.dispatch(getTweetDeleteAction(id));
};

export const deleteTweets = () => {
  store.dispatch(getTweetsDeleteAction());
};

export const getTweets = () => {
  return store.getState();
};

export const subscribe = (cb) => {
  store.subscribe(() => {
    cb(store.getState());
  });
};
