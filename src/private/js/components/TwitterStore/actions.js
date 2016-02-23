export const ADD_TWEET = 'ADD_TWEET';
export const DELETE_TWEET = 'DELETE_TWEET';
export const DELETE_TWEETS = 'DELETE_TWEETS';

export const getTweetAddAction = (text, id) => {
  return {
    id: id,
    text: text,
    type: ADD_TWEET
  };
};

export const getTweetDeleteAction = (id) => {
  return {
    id: id,
    type: DELETE_TWEET
  };
};

export const getTweetsDeleteAction = () => {
  return {
    type: DELETE_TWEETS
  };
};
