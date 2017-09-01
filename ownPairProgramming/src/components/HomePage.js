import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as challengesActions from '../actions/challengesActions';
import * as userActions from '../actions/userActions.js';


class HomePage extends React.Component {
  componentDidMount() {
    if (this.props.challenges.length == 0) {
      this.props.actions.getChallenges()
    }
  }

  chooseUserName(userName) {
    this.props.actions.assignUserName(userName);
  }
  render() {
    return (
      <div>
        <h1>This is the home page</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {challenges: state.challenges, userName: state.currentUser}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Object.assign(userActions, challengesActions), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
