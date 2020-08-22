const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 2000

const router = require('./router');
const {createRoom, getRoom, deleteRoom} = require('./rooms');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', (socket) => {
	
	console.log(`user ${socket.id} connected`);

	socket.on('join', ({ room_id, user }, cb) => {
		let { err, room } = getRoom(room_id);

		if(err) {
			return cb({ err });
		}

		err = room.addUser(user);

		if(err) {
			return cb({ err });
		}

		console.log(`new user ${user} has been added to room ${room}`);

		cb({ room_name:room.name });
	});

	socket.on('create-room', ({ room_name }, cb) => {
		const { err, room_id } = createRoom(room_name);

		if(err) {
			return cb({ err });
		}
		console.log(`new room ${room_name} with id ${room_id} was created`);

		cb({ room_id });
	});

	socket.on('disconnect', () => {
		console.log(`user ${socket.id} just left`);
	});
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
