import React, { PropTypes } from 'react';

export const Tweet = (id, text, timestamp) => (
  <li>{id} - {timestamp} - {text}</li>
);

Tweet.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired
};

export default Tweet;
