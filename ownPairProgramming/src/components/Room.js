import React from 'react';

import * as actions from '../actions/challengesActions'  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

class Room extends React.Component {
	componentDidMount() {
		console.log("Running componentDidMount");
		if (this.props.challenge.id == undefined) {
			this.props.actions.getChallenges();
		}
	}

	render() { 
		return (
			<div>
				<div className="container">
					<p>This is room id: {this.props.challenge.id}</p>
					<p>This is room name: {this.props.challenge.name}</p>
				</div>
			</div>
		)
	}
}

// Todo: fix case when trying to get a high room number and so filters nothing
function mapStateToProps(state, ownProps) {  
	if (state.challenges.length > 0) {
		console.log("mapStateToProps: state is: ", state);
		console.log("mapStateToProps: ownProps is: ", ownProps);
		const challenge = state.challenges.filter(challenge => 
		{
			return challenge.id == ownProps.params.id
		})[0];	// Since using filter so get first 1
		return {challenge: challenge}
	}
	else {
		console.log("mapStateToProps: state is: ", state);
		return {challenge: {title: '', description: ''}}
	}
}

function mapDispatchToProps(dispatch) {  
  return {actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(Room)  
