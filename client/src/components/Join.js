import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

import Logo from './the-room.svg';

import SOCKET_ENDPOINT from './Endpoint'

import Loading from './Loading'

let socket;

const Join = ({location}) => {
	const [name, setName] = useState('');
	const [room_id, setRoomID] = useState('');
	const [room_name, setRoomName] = useState('');
	const [room_err, setRoomErr] = useState('');


	useEffect(() => {
		const {room_id} = queryString.parse(location.search);

		setRoomID(room_id);

		socket = io(SOCKET_ENDPOINT);

		socket.emit('roomName', room_id, ({err, name}) => {
			if(err) {
				setRoomErr(err);
				return;
			}
			setRoomName(name);
		});
	}, [location.search, SOCKET_ENDPOINT]);

	//when some error happened   e.g. room does not exist
	if(room_err) {
		return(
			<div>
				<p>Failed to find room: {room_err}</p>
			</div>
		);
	}

	//when ok render join page
	if(room_name) {
		return (
			<div className='container-center'>
				<form className='form-signin'>
					<img className='form-logo' src={Logo} alt='The Room logo' />
					<h1 className='form-label'>Join to {room_name}</h1>
					<input className='form-input-text form-input-top' type='text' placeholder='Your name' onChange={event => setName(event.target.value)} />
					<Link className='form-link' onClick={event => !name ? event.preventDefault() : null } to={`/chat-room?room_id=${room_id}&name=${name}`}>
						<button className='form-submit form-bottom' type='submit'>Join room</button>
					</Link>
				</form>
			</div>
		);
	}

	//loading page render
	return (
		<Loading />
	);
};

export default Join;
