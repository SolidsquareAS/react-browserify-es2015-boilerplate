import React, { PropTypes } from 'react';
import Tweet from './../Tweet';

export const Tweets = ({tweets}) => (
  <ul>
    {tweets.map(tweet =>
      <Tweet key={tweet.id} {...tweet}/>
    )}
  </ul>
);

Tweets.propTypes = {
  tweets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
};

export default Tweets;
