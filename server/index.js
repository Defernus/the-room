const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 2000

const router = require('./router');
const {createRoom, getRoom, deleteRoom, getRoomByUserID} = require('./rooms');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', (socket) => {
	
	console.log(`user ${socket.id} connected`);

	socket.on('join', ({ room_id, user_name }, cb) => {
		//TODO check user name
		if(!user_name) {
			return cb({err: `user name is ${user_name}`});
		}

		room = getRoom(room_id);

		if(!room) {
			return cb({ err: `could not find room witch id ${room_id}` });
		}

		err = room.addUser({ name: user_name, id: socket.id });

		if(err) {
			return cb({ err });
		}

		socket.join(room_id);

		console.log(`new user ${user_name} has been added to room ${room.name}`);
		
		io.in(room_id).emit('message', { from: room.name, text: `Welcome, ${user_name}!` });

		cb({ room_name:room.name });
	});

	socket.on('roomName', (id, cb) => {
		const room = getRoom(id);
		if(!room) {
			return cb({ err: `could not find room witch id ${id}` });
		}
		cb({ name: room.name });
	});

	socket.on('sendMessage', ({ text }, cb) => {
		if(!text) {
			return cb({ err: `message is empty` });
		}

		let { err, room } = getRoomByUserID(socket.id);

		if(err) {
			return cb(err);
		}

		user = room.users.get(socket.id);
		if(!user) {//it will newer happened, but just in case...
			throw `could not find user with id ${socket.id} in the room ${room.id}`;
		}

		io.in(room.id).emit('message', { from: user.name, text });

		console.log(`message from user ${user.name} at room ${room.name}: ${text}`);

		cb();
	});

	socket.on('create-room', ({ room_name }, cb) => {
		//TODO check room name
		if(!room_name) {
			cb({ err: `empty room name` });
		}

		let { err, room_id } = createRoom(room_name);

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
