const {Room} = require('./room');

var rooms = new Map();
var last_id = 0;

const createRoom = room_name => {
	//TODO make better room id system

	const room_id = `${++last_id}`;
	let i = 0;

	rooms.set(room_id, new Room(room_name, room_id));

	return {room_id};
};

const getRoom = room_id => {
	return rooms.get(room_id);
}

const deleteRoom = room_id => {
	return rooms.delete(room_id);
}

const getRoomByUserID = user_id => {
	const room = [...rooms.entries()].find(r => Boolean(r[1].users.get(user_id)));
	return room ? { room:room[1] } : { err: `could not find such room` };
};


module.exports = {createRoom, getRoom, deleteRoom, getRoomByUserID};
