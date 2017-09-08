import initialState from './initialState'

export default function challengesReducer(state=initialState.challenges, action) {
	// console.log("\n===Reducer challengesReducer running.");
	// console.log("state is: ", state);
	// console.log("action is: ", action);
	switch(action.type) {
		case 'GET_CHALLENGES_SUCCESS':
			// console.log("Reducer: GET_CHALLENGES_SUCCESS.");		
			return action.payload;
		default:
			// console.log("Reducer: default."); 
			return state;
	}
}
