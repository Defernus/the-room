const checkName = name => {
	if( typeof name !== 'string') {
		return 'type error';
	}

	if( name.length < 3 || name.length > 16 ) {
		return `wrong length (${name.length})`;
	}
};

module.exports = {checkName};
