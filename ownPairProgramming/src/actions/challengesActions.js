var url = "https://59aaf7f17f70eb00110191ff.mockapi.io/api/v1/challenges";

export function getChallengesSuccess(challenges) {
	console.log("Action dispatched- getChallengesSuccess. challenges is: ", challenges);
	return {
			type: 'GET_CHALLENGES_SUCCESS',
			payload: challenges
		}
}


export function willReceiveChallenges() {
	console.log("Action dispatched- willReceiveChallenges.");
	return {type: 'WILL_RECEIVE_CHALLENGES'}
}

export function getChallenges() {
	console.log("Action dispatched- getChallenges.");
	return function (dispatch) {
		dispatch(willReceiveChallenges());
		return fetch(url)
      		.then(
        		response => response.json(),
        		error => console.log('An error occured.', error)
      		)
			.then(json => {
				console.log("getChallenges: json is: ", json);
				dispatch(getChallengesSuccess(json));
			})
  	}
}
