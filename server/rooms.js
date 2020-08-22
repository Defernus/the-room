const {Room} = require('./room');

var rooms = new Map();
var last_id = 0;

const createRoom = room_name => {
	//TODO make better room id system

	const room_id = `${++last_id}`;
	let i = 0;

	rooms.set(room_id, new Room(room_name));

	return {room_id};
}

const deleteRoom = room_id => {
	const success = rooms.delete(room_id);
	return success ? {err:null} : {err:`room with id ${room_id} does not exist`};
};

const getRoom = room_id => {
	const room = rooms.get(room_id);
	return room ? {room} : {err:`room with id ${room_id} does not exist`};
};


module.exports = {createRoom, deleteRoom, getRoom};
