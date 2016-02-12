jest.dontMock('./../reducers');

const reducers = require('./../reducers');
const actions = require('./../actions');
const deepFreeze = require('deep-freeze');

describe('reducers', () => {
  describe('tweets', () => {
    let tweets = reducers.tweets, otherTweet = {id: 321, text: "other tweet"};
    it('should be a function', () => {
      expect(typeof tweets).toEqual('function');
    });
    describe('ADD_TWEET', () => {
      let type = actions.ADD_TWEET, actionDefaults = {type: type};
      it('should add a tweet to the list', () => {
        var id = 123,
          text = 'text',
          expectedAction = {id: id, text: text},
          action = Object.assign({}, expectedAction, actionDefaults),
          stateBefore = [otherTweet],
          stateAfter = [otherTweet, expectedAction];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(tweets(stateBefore, action)).toEqual(stateAfter);
      });
    });
    describe('DELETE_TWEET', () => {
      let type = actions.DELETE_TWEET, actionDefaults = {type: type};
      it('should remove tweet from the list', () => {
        var expectedAction = {id: 123},
          action = Object.assign({}, expectedAction, actionDefaults),
          stateBefore = [expectedAction, otherTweet],
          stateAfter = [otherTweet];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(tweets(stateBefore, action)).toEqual(stateAfter);
      });
    });
    describe('DELETE_TWEETS', () => {
      let type = actions.DELETE_TWEETS, actionDefaults = {type: type};
      it('should remove all tweet from the list', () => {
        var expectedAction = {id: 123},
          action = actionDefaults,
          stateBefore = [expectedAction, otherTweet],
          stateAfter = [];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(tweets(stateBefore, action)).toEqual(stateAfter);
      });
    });
  });
});
