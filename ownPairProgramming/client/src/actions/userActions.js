export function assignUserName(userName) {
	console.log("Action dispatched- assignUserName with userName as: ", userName);
	return {type: 'ASSIGN_USERNAME', payload: userName}
}
