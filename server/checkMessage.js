const checkMessage = message => {
	if( typeof message !== 'string') {
		return { err: 'type error' };
	}

	if( message.length < 1 || message.length > 4096 ) {
		return { err: `wrong length (${message.length})` };
	}

	let arr = message.split('\n').filter(s=>s);
	if( arr && arr.length ) {
		return { message: arr[0] };
	}
	return { err: 'empty message' }
};

module.exports = {checkMessage};
