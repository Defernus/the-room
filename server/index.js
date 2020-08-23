const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 2000

const router = require('./router');
const {checkName} = require('./checkName');
const {checkMessage} = require('./checkMessage');
const {createRoom, getRoom, deleteRoom, getRoomByUserID} = require('./rooms');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', (socket) => {
	
	socket.on('join', ({ room_id, user_name }, cb) => {
		let err = checkName(user_name);
		//TODO check user name
		if(err) {
			return cb({err});
		}

		let room = getRoom(room_id);

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
		let {err, message} = checkMessage(text);
		if(err) {
			return cb(err);
		}

		const room = getRoomByUserID(socket.id);

		if(!room) {
			return cb(`could not find the room`);
		}

		user = room.users.get(socket.id);
		if(!user) {//it will newer happened, but just in case...
			throw `could not find user with id ${socket.id} in the room ${room.id}`;
		}

		io.in(room.id).emit('message', { from: user.name, text: message });

		console.log(`message from user ${user.name} at the room ${room.id}: ${message}`);

		cb();
	});

	socket.on('create-room', ({ room_name }, cb) => {
		//TODO check room name
		let err = checkName(room_name);
		if(err) {
			cb({ err });
		}

		let { err_r, room_id } = createRoom(room_name);

		if(err_r) {
			return cb({ err_r });
		}
		console.log(`new room ${room_name} with id ${room_id} was created`);

		cb({ room_id });
	});

	socket.on('disconnect', () => {
		const room = getRoomByUserID(socket.id);

		if(!room) {
			return;
		}
		
		if(!room.users.delete(socket.id)) {
			console.error(`failed to delete user with id ${socket.id} from room ${room.id}`);
			return;
		}


		console.log(`user with id ${socket.id} left the room ${room.id}`);
	});
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
