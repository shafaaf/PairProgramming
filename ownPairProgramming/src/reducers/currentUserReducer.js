import initialState from './initialState'

export default function currentUserReducer(state=initialState.currentUser, action) {
	console.log("\n===Reducer currentUserReducer running.");
	console.log("state is: ", state);
	console.log("action is: ", action);
	switch(action.type) {
		case 'ASSIGN_USERNAME':
			console.log("Reducer: ASSIGN_USERNAME.");
			sessionStorage.setItem('currentUser', action.payload)
			return action.payload;
		default:
			console.log("Reducer: default.");
			return sessionStorage.currentUser || state
	}
}
