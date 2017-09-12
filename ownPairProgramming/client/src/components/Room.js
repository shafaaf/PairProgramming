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

// Note: Page refreshes causes main connection again
const io = require('socket.io-client');
const socket = io('http://localhost:8000');  
		
class Room extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			users: [],
			currentlyTyping: null
		};
		// New code events sent only to specific chat room channels,
		// and so this socket will receive it only if hes on that room
		socket.on('receiveCode', (payload) => {
			console.log("receiveCode called with payload: ", payload);
			this.updateCodeFromSockets(payload);
		});
	}
	
	// State variables remains even after unmounting
	componentDidMount() {
		console.log("Running componentDidMount");
		console.log("componentDidMount: this.props is: ", this.props);
		// Happens when refresh on room page as challenges not yet available locally
		if (this.props.challenge == undefined) {
			console.log("componentDidMount: this.props.challenge undefined.");
			this.props.actions.getChallenges();
		}
		else{	// Happens when redirect and come to room page after getting challenges before.	
			console.log("componentDidMount: challenge.id not undefined.");
			socket.emit('enterRoom', {room: this.props.challenge.id});
		}
	}

	// Called when refreshing on room page since then will receive new props from mapStateToProps
	// IMP - this not called when switched onto this rooms route since NO props passed
	componentWillReceiveProps(nextProps){
		console.log("componentWillReceiveProps running. nextProps is: ", nextProps);
		socket.emit('enterRoom', {room: nextProps.challenge.id});
	}

	componentWillUnmount(){
		console.log("Unmounting Room component.");
		socket.emit('leaveRoom', { room: this.props.challenge.id })
	}

	userUpdatingCode(newText) {
    	this.setState({
    		code: newText,
    		currentlyTyping: this.props.currentUser
    	}, 
    		() => {
    			 socket.emit('userCoding', {
				    room: this.props.challenge.id,
				    newCode: newText,
				    currentlyTyping: this.props.currentUser
				  })
    		});
  	}

  	updateCodeFromSockets(payload) {
  		var newCode = payload.newCode;
    	this.setState({ 
    		code: newCode,
    		currentlyTyping: payload.currentlyTyping
    	});
  	}

	render() {
		if(this.props.challenge == null){
			return <h1>Challenge not found</h1>;
		}
		else{
			const options = {
				lineNumbers: true,
				mode: 'javascript',
				theme: 'monokai'
			};
			return (
				<div>
					<div className="container">
						<div>
							<h1>Event log</h1>
						</div>
						<h3>currentlyTyping is: {this.state.currentlyTyping}</h3>
						<h3>Code is: {this.state.code}</h3>
						<p>This is room id: {this.props.challenge.id}</p>
						<h2>{this.props.challenge.title}</h2>
						<p>{this.props.challenge.description}</p>
						<Codemirror 
					        value={this.state.code}
					        onChange={this.userUpdatingCode.bind(this)}
					        options={options} />				
					</div>
				</div>
			);
		}
	}
}

// Note: Runs again when reducer changes state
function mapStateToProps(state, ownProps) {  
	if (state.challenges.length > 0) {
		console.log("mapStateToProps: challenges not empty. state is: ", state);
		console.log("mapStateToProps: ownProps is: ", ownProps);
		const challenge = state.challenges.filter(challenge => 
		{
			return challenge.id == ownProps.params.id
		})[0];	// Since using filter so get first 1
		console.log("mapStateToProps: challenge is: ", challenge);
		if(challenge == undefined){
			return { challenge: null, currentUser: state.currentUser};
		}
		else{
			return {challenge: challenge, currentUser: state.currentUser};
		}
	}
	else {
		console.log("mapStateToProps: challenges empty. state is: ", state);
		return {challenge: null, currentUser: state.currentUser}
	}
}

function mapDispatchToProps(dispatch) {  
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)  
