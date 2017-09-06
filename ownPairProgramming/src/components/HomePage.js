import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as challengesActions from '../actions/challengesActions';
import * as userActions from '../actions/userActions.js';

import ChooseUserName from './ChooseUserName';
import ChallengesList from './ChallengesList';


class HomePage extends React.Component {
  componentDidMount() { // Just get initial challenges list
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
        <h2>Welcome, {this.props.userName}</h2>
        <ChooseUserName userName={this.props.userName} chooseUserName={this.chooseUserName.bind(this)} />
        <ChallengesList challenges={this.props.challenges} />
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
