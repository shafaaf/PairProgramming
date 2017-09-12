import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

export default class ChooseUserName extends React.Component {
	constructor(props) {
    	super(props);
    	this.userName = this.props.userName;
    }

    usernameHandleChange(e){
    	var username = e.target.value;
    	console.log("username is: ", username);
    	this.userName = username;
    }

    onSubmitUsername(){
    	console.log("onSubmitUsername called. userName is: ", this.userName);
    	this.props.chooseUserName(this.userName);
    }

	render() { 
		return (
			<div>
				<div>
					<Form inline style={{textAlign: "center"}}>
						<FormGroup controlId="formInlineEmail">
							<FormControl 
								type="text" 
								placeholder={this.props.userName} 
								onChange={this.usernameHandleChange.bind(this)}/>
						</FormGroup>
						<Button onClick={this.onSubmitUsername.bind(this)}>
							Change username
						</Button>
					</Form>
				</div>
			</div>
		)
	}
}
