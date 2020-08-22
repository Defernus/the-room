import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';



const Join = ({location}) => {
	const [name, setName] = useState('');
	const [room_id, setRoomID] = useState('');

	useEffect(() => {
		const {room_id} = queryString.parse(location.search);

		setRoomID(room_id);
	}, [location.search]);

	return (
		<form className='form-join-room'>
			<input className='form-input-text form-input-top' type='text' placeholder='Your name' onChange={event => setName(event.target.value)} />
			<Link className='form-link' onClick={event => !name ? event.preventDefault() : null } to={`/chat-room?room_id=${room_id}&name=${name}`}>
				<button className='form-submit form-bottom' type='submit'>Join room</button>
			</Link>
		</form>
	);
};

export default Join;
