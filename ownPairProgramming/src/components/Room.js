import React from 'react';

import * as actions from '../actions/challengesActions'  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import Codemirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/solarized.css';

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/ruby/ruby.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/clojure/clojure.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/erlang/erlang.js'
import 'codemirror/mode/coffeescript/coffeescript.js'
import 'codemirror/mode/crystal/crystal.js'


class Room extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			code: ''
		};
	}

	updateCodeInState(newText) {
    	this.setState({code: newText})
  	}

	componentDidMount() {
		console.log("Running componentDidMount");
		if (this.props.challenge.id == undefined) {
			this.props.actions.getChallenges();
		}
	}

	render() {
		const options = {
			lineNumbers: true,
			mode: 'javascript',
			theme: 'monokai'
		}

		return (
			<div>
				<div className="container">
					<p>This is room id: {this.props.challenge.id}</p>
					<h2>{this.props.challenge.title}</h2>
					<p>{this.props.challenge.description}</p>
					<Codemirror 
				        value={this.state.code}
				        onChange={this.updateCodeInState.bind(this)}
				        options={options} />				
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
