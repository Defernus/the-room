
function Room(room_name) {
	this.addUser = user => {
		if( this.users.has(user.name) ) {
			return `user with name ${user.name} is alredy in the room`;
		}

		this.users.set(user.name, user);
	};

	this.deleteUser = user => {
		if(!users.delete(user.name)) {
			return {err:`there is alredy no user with name ${user.name}`};
		}
	}

	this.getUser = user_name => {
		const user = users.get(user_name);
		return user ? {user} : {err:`there is no user with name ${user_name}`};
	}


	this.name = room_name;
	this.users = new Map();

}

module.exports = {Room};
