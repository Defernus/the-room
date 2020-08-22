
function Room(name, id) {
	this.addUser = user => {
		if( this.users.has(user.id) ) {
			return `user with name ${user.name} is alredy in the room`;
		}

		this.users.set(user.id, user);
	};


	this.name = name;
	this.id = id;
	this.users = new Map();

}

module.exports = {Room};
