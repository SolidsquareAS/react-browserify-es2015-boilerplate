import Twitter from 'twitter';
import {twitter} from '../oauth';

const client = new Twitter({
  consumer_key: twitter.consumer_key,
  consumer_secret: twitter.consumer_secret,
  access_token_key: twitter.access_token_key,
  access_token_secret: twitter.access_token_secret
});

export const addTwitterStream = (track, cb) => {
  client.stream('statuses/filter', {track: track}, function (stream) {
    stream.on('data', function (tweet) {
      cb(tweet);
    });

    stream.on('error', function (error) {
      throw error;
    });
  });
};

export const addTwitterSearch = (query, cb) => {
  try {
    client.get('search/tweets', {q: query}, function (error, tweets) {
      if (error) {
        process.stderr.write(error);
        return cb([]);
      }
      cb(JSON.stringify(tweets));
    });
  } catch (e) {
    process.stderr.write(e);
  }
};

export default {addTwitterStream, addTwitterSearch};
