var url = "https://59aaf7f17f70eb00110191ff.mockapi.io/api/v1/challenges";

export function receivingChallenges() {
	console.log("Action dispatched- receivingChallenges.");
	return {type: 'RECEIVING_CHALLENGES'}
}

export function receivedChallenges() {
	console.log("Action dispatched- receivedChallenges.");
	return {type: 'RECEIVED_CHALLENGES'}
}

export function getChallenges() {
	console.log("Action dispatched- getChallenges.");
	return function (dispatch) {
		dispatch(receivingChallenges());
		return fetch(url)
      		.then(
        		response => response.json(),
        		error => console.log('An error occured.', error)
      		)
			.then(json => {
				console.log("json is: ", json);
				dispatch(receivedChallenges(json));
			})
  	}
}
