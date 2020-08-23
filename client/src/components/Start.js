import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';

import Logo from './the-room.svg';

import SOCKET_ENDPOINT from './Endpoint'

let socket;

const Start = () => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [redirect, setRedirect] = useState('');

	useEffect(() => {
		socket = io(SOCKET_ENDPOINT);
	}, [SOCKET_ENDPOINT]);

	const createRoom = event => {
		event.preventDefault();

		if(!name || !room) {
			return;
		}

		//TODO handle invalid params
		if( name.length < 3 ) {
			alert(`Name should be at least 3 characters long!`);
			return;
		}

		if( room.length < 3 ) {
			alert(`Room name should be at least 3 characters long!`);
			return;
		}

		socket.emit('create-room', {room_name:room}, ({ err, room_id }) => {
			if(err) {
				//TODO handle error, e.g. room name is alredy used or something
				alert(err);
				return;
			}

			
			console.log(room_id, name);
			setRedirect(`/chat-room?room_id=${room_id}&name=${name}`);
		});


	}

	if(redirect) {
		return (
			<Redirect to={redirect} />
		);
	}
	
	return (
		<div className='container-center'>
			<form className='form-signin'>
				<img className='form-logo' src={Logo} alt='The Room logo' />
				<h1 className='form-label'>Create The Room!</h1>
				<input className='form-input-text form-input-top' type='text' placeholder='Your name' maxlength='16' onChange={event => setName(event.target.value)} />
				<input className='form-input-text form-input-middle' type='text' placeholder='Room name' maxlength='16' onChange={event => setRoom(event.target.value)}  />
				
				<button className='form-submit form-bottom' type='submit' onClick={createRoom}>Create</button>
			</form>
		</div>
	);
};

export default Start;
