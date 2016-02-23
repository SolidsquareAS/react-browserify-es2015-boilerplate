import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tweetActions from './../../components/TwitterStore/actions';
import Tweets from './../../components/Tweets';

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets
  };
};

const mapDispatchToProps = (dispatch) => {
  return {tweetActions: bindActionCreators(tweetActions, dispatch)};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tweets);
