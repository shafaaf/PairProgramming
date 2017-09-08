var io = require('socket.io')();

io.on('connection', (socket) => {
	console.log('a user has connected');

	socket.on('disconnect', () => {
    	console.log('a user has disconnected');
  	});

  	socket.on('enterRoom', (data) => {
  		console.log("a user has enterRooom. room is: ", data.room);
    	socket.join(data.room);
  	});

  	socket.on('leaveRoom', (data) => {
  		console.log("a user has leaveRoom. newCode is: ", data.newCode);
    	socket.leave(data.room);
  	});

	socket.on('userCoding', (data) => {
		console.log("a user is userCoding. data is: ", data);
		// Emit to those clients in that specific chat room,
		// so only they will receive it.
		socket.broadcast.to(data.room).emit('receiveCode', data);
  	});
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
