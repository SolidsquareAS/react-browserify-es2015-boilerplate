jest.dontMock('./../actions');

const actions = require('./../actions');

describe('actions', () => {
  describe('getTweetAddAction', () => {
    const expectedType = 'ADD_TWEET';
    it('should be a function', () => {
      expect(typeof actions.getAddTweetAction).toEqual('function');
    });
    it('should return a action with text, id and action type', () => {
      let text = "text", id = 123, action = actions.getAddTweetAction(text, id);
      expect(action).toEqual({id: id, text: text, type: expectedType});
    });
    it('should have expected type', () => {
      expect(actions.getAddTweetAction().type).toEqual(expectedType);
    });
    it('should have a constant for adding tweets', () => {
      expect(actions.ADD_TWEET).toEqual(expectedType);
      expect(typeof actions.ADD_TWEET).toEqual('string');
    });
  });
  describe('getTweetDeleteAction', () => {
    const expectedType = 'DELETE_TWEET';
    it('should be a function', () => {
      expect(typeof actions.getTweetDeleteAction).toEqual('function');
    });
    it('should return a action with id and action type', () => {
      let id = 123, action = actions.getTweetDeleteAction(id);
      expect(action).toEqual({id: id, type: expectedType});
    });
    it('should have expected type', () => {
      expect(actions.getTweetDeleteAction().type).toEqual(expectedType);
    });
    it('should have a constant for adding tweets', () => {
      expect(actions.DELETE_TWEET).toEqual(expectedType);
      expect(typeof actions.DELETE_TWEET).toEqual('string');
    });
  });
  describe('getTweetsDeleteAction', () => {
    const expectedType = 'DELETE_TWEETS';
    it('should be a function', () => {
      expect(typeof actions.getTweetsDeleteAction).toEqual('function');
    });
    it('should return a action with id and action type', () => {
      let action = actions.getTweetsDeleteAction();
      expect(action).toEqual({type: expectedType});
    });
    it('should have expected type', () => {
      expect(actions.getTweetsDeleteAction().type).toEqual(expectedType);
    });
    it('should have a constant for adding tweets', () => {
      expect(actions.DELETE_TWEETS).toEqual(expectedType);
      expect(typeof actions.DELETE_TWEETS).toEqual('string');
    });
  });
});
