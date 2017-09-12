var io = require('socket.io')();

io.on('connection', (socket) => {
	console.log('a user has connected');

	socket.on('disconnect', () => {
    console.log('a user has disconnected');
  });

	socket.on('enterRoom', (data) => {
		console.log("a user has enterRooom. data is: ", data);
    socket.join(data.room);
    // Tell all users to send their list of users and current code
    var dataToSend = { newUser: data.newUser};
    socket.broadcast.to(data.room).emit('newUserJoin', dataToSend)
	});

	socket.on('leaveRoom', (data) => {
    console.log("a user has leaveRoom. data is: ", data);
    var dataToSend = { userLeaving: data.userLeaving};
    socket.broadcast.to(data.room).emit('otherUserLeft', dataToSend)
    socket.leave(data.room);
  });

	socket.on('userCoding', (data) => {
		console.log("a user is userCoding. data is: ", data);
		// Emit to those clients in that specific chat room,
		// so only they will receive it even though all clients 
    // listening in globally.
		socket.broadcast.to(data.room).emit('receiveCode', data);
  });

  socket.on('sendUsersAndCode', (data) => {
    console.log("a user is sendUsersAndCode. data is: ", data);
    socket.broadcast.to(data.room).emit('receiveUsersAndCode', data);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
