import React from 'react'  
import { Link } from 'react-router'  
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class ChallengesList extends React.Component {
	renderChallenges() {
		var challenges = this.props.challenges.map((challenge, i) => 
			<ListGroupItem key={i}>
				<Link to={`/rooms/${challenge.id}`}>{challenge.title}</Link>
			</ListGroupItem>			
		);
		console.log("ChallengesList: challenges is: ", challenges);
		return (
			<ListGroup style={{height: '60%'}}>
				{challenges}
			</ListGroup>
		)
	}
	render() {
		return (
			<div>
				<p>This is the ChallengesList page.</p>
				{this.renderChallenges()}
			</div>
		)
	}
}

export default ChallengesList;
