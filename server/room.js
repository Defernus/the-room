function Room(name, id) {
	this.addUser = user => {
		if( this.users.has(user.id) ) {
			return `user with name ${user.name} is alredy in the room`;
		}

		if([...this.users.entries()].find( u => Boolean(u[1].name === user.name))) {
			return `user with name ${name} is alredy in the room`;
		}

		this.users.set(user.id, user);
	};


	this.name = name;
	this.id = id;
	this.users = new Map();

}

module.exports = {Room};
