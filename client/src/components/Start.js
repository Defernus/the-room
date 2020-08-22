import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Start.css'

const Start = () => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	return (
		<form className='form-signin'>
			<input className='form-input-text form-input-top' type='text' placeholder='Your name' onChange={event => setName(event.target.value)} />
			<input className='form-input-text form-input-middle' type='text' placeholder='Room name' onChange={event => setRoom(event.target.value)}  />
			
			<Link className='form-link' onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat-room?name=${name}&room=${room}`}>
				<button className='form-submit form-bottom' type='submit'>Create room</button>
			</Link>
		</form>
	);
};

export default Start;
