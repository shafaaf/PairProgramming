import React from 'react';

import * as actions from '../actions/challengesActions'  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

// Note: Page refreshes causes main connection again
const io = require('socket.io-client');
const socket = io('http://localhost:8000'); 

		
class Room extends React.Component {
	constructor(props) {
		super(props);
		// console.log("constructor: props is: ", props);
		this.state = {
			code: '',
			users: [this.props.currentUser],
			currentlyTyping: "No one"
		};

		// Socket Events
		// New code events sent only to specific chat room channels,
		// and so this socket will receive it only if hes on that room

		// Receive new code that someone just typed
		// Update local code and currentlyTyping
		socket.on('receiveCode', (payload) => {
			console.log("receiveCode called with payload: ", payload);
			this.updateCodeFromSockets(payload);
		});

		// Listening for new users to join this room.
		// Update locallist of users
		// Then send local list of users, and code to server to broadcasr
		socket.on('newUserJoin', (payload) => {
			console.log("newUserJoin called with payload: ", payload);
			
			// Adding in new user
			var newUser = payload.newUser;
			const combinedUsers = [...this.state.users, newUser]
		    const newUsers = Array.from(new Set(combinedUsers));
		    const cleanUsers = newUsers.filter(user => {return user.length > 1})
		    this.setState({users: cleanUsers},
		    	() => {
		    		// Sending local user list and code to server to broadcast
    				socket.emit('sendUsersAndCode', {
					    room: this.props.challenge.id,
					   	users: this.state.users, 
					   	code: this.state.code
				  	})
    			}
		    );
		});

		// Listening for new users and new code
		// Needed to make sure new user gets latest code
		// Called after a new user joins in and everyone broadcasts to everyone to get latest states
		socket.on('receiveUsersAndCode', (payload) => {
			console.log("receiveUsersAndCode called with payload: ", payload);
			// Update local users list and code
			const combinedUsers = this.state.users.concat(payload.users)
		    const newUsers = Array.from(new Set(combinedUsers));
		    const cleanUsers = newUsers.filter(user => {return user.length > 1})
		    this.setState({
		    	users: cleanUsers, 
		    	code: payload.code
		    })
		});

		// Listening for other users leaving. Update local state
		socket.on('otherUserLeft', (payload) => {
			console.log("otherUserLeft called with payload: ", payload);
			//Update local state to remove user that left
			var userLeaving = payload.userLeaving;
			const newUsers = Object.assign([], this.state.users);
		    const indexOfUserToDelete = this.state.users.findIndex(Olduser => {return Olduser == userLeaving})
		    newUsers.splice(indexOfUserToDelete, 1);
		    this.setState({users: newUsers})
		});

	}
	
	// State variables remains even after unmounting
	componentDidMount() {
		// console.log("Running componentDidMount");
		// console.log("componentDidMount: this.props is: ", this.props);
		// Happens when refresh on room page as challenges not yet available locally
		if (this.props.challenge == undefined) {
			// console.log("componentDidMount: this.props.challenge undefined.");
			this.props.actions.getChallenges();
		}
		else{	// Happens when redirect and come to room page after getting challenges before.	
			// console.log("componentDidMount: challenge.id not undefined.");
			socket.emit('enterRoom', {room: this.props.challenge.id, newUser: this.props.currentUser});
		}
	}

	// Called when refreshing on room page since then will receive new props from mapStateToProps
	// IMP - this not called when switched onto this rooms route since NO props passed
	componentWillReceiveProps(nextProps){
		// console.log("componentWillReceiveProps running. nextProps is: ", nextProps);
		socket.emit('enterRoom', {room: nextProps.challenge.id, newUser: this.props.currentUser});
	}

	componentWillUnmount(){
		// console.log("Unmounting Room component.");
		socket.emit('leaveRoom', { room: this.props.challenge.id, userLeaving: this.props.currentUser })
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
			return (
				<div>
					<div className="container">
						<div>
							<h1>{this.props.currentUser}&#39;s event log</h1>
						</div>
						<p>Currently typing is: {this.state.currentlyTyping}</p>
						<p>Users are:</p>
							<ul>
							{
								this.state.users.map((user, index) =>
									<li key={index}>{user}</li>
								)
							}
							</ul>
						
						<p>This is room id: {this.props.challenge.id}</p>
						<h2>{this.props.challenge.title}</h2>
						<p>{this.props.challenge.description}</p>
						<AceEditor
							mode="javascript"
							theme="github"
							name="blah2"
							onChange={this.userUpdatingCode.bind(this)}
					        value={this.state.code}
					        fontSize={14}
							showPrintMargin={true}
							showGutter={true}
							highlightActiveLine={true}
							setOptions={{
								enableBasicAutocompletion: true,
								enableLiveAutocompletion: true,
								enableSnippets: false,
								showLineNumbers: true,
								tabSize: 2,
							}}/>
					</div>
				</div>
			);
		}
	}
}

// Note: Runs again when reducer changes state
function mapStateToProps(state, ownProps) {  
	if (state.challenges.length > 0) {
		// console.log("mapStateToProps: challenges not empty. state is: ", state);
		// console.log("mapStateToProps: ownProps is: ", ownProps);
		const challenge = state.challenges.filter(challenge => 
		{
			return challenge.id == ownProps.params.id
		})[0];	// Since using filter so get first 1
		// console.log("mapStateToProps: challenge is: ", challenge);
		if(challenge == undefined){
			return { challenge: null, currentUser: state.currentUser};
		}
		else{
			return {challenge: challenge, currentUser: state.currentUser};
		}
	}
	else {
		// console.log("mapStateToProps: challenges empty. state is: ", state);
		return {challenge: null, currentUser: state.currentUser}
	}
}

function mapDispatchToProps(dispatch) {  
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)  
