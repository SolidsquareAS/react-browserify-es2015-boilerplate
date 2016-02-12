jest.dontMock('./../TwitterStore');

const twitterStore = require('./../TwitterStore');

describe('TwitterStore', () => {
  afterEach(() => {
    twitterStore.deleteTweets();
    expect(twitterStore.getTweets()).toEqual([]);
  });
  it('should be defined', () => {
    expect(twitterStore).toBeDefined();
  });
  describe('getTweets', () => {
    it('should have default state', () => {
      expect(twitterStore.getTweets()).toEqual([]);
    });
  });
  describe('addTweet', () => {
    it('should be a function', () => {
      expect(typeof twitterStore.addTweet).toEqual('function');
    });
    it('should add text to store', () => {
      const text = "Tweet";
      twitterStore.addTweet(text);
      expect(twitterStore.getTweets()[0].text).toEqual(text);
    });
  });
  describe('deleteTweet', () => {
    it('should delete a tweet with id', () => {
      twitterStore.addTweet("TEXT");
      var tweets = twitterStore.getTweets;
      expect(tweets().length).toEqual(1);
      twitterStore.deleteTweet(tweets()[0].id);
      expect(tweets().length).toEqual(0);
    });
  });
  describe('deleteTweets', () => {
    it('should delete all tweets', () => {
      twitterStore.addTweet("TEXT1");
      twitterStore.addTweet("TEXT2");
      twitterStore.addTweet("TEXT3");
      var tweets = twitterStore.getTweets;
      expect(tweets().length).toEqual(3);
      twitterStore.deleteTweets();
      expect(tweets().length).toEqual(0);
    });
  });
  describe('subscribe', () => {
    it('should be notified on each change in state', () => {
      let cb = jest.genMockFunction();
      let text = "new tweet";
      twitterStore.subscribe(cb);
      twitterStore.addTweet(text);
      expect(cb.mock.calls[0][0][0].text).toEqual(text);
    });
  });
});
