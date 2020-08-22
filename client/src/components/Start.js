import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import SOCKET_ENDPOINT from './Endpoint'

import './Start.css'

let socket;

const Start = () => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	useEffect(() => {
		socket = io(SOCKET_ENDPOINT);
	}, [SOCKET_ENDPOINT]);

	const isValid = str => {
		//TODO check if str is valid
		return Boolean(str);
	}

	const createRoom = event => {
		event.preventDefault();

		//TODO handle invalid params
		if( !isValid(name) ) {
			alert(`name ${name} can not be used!`);
			return;
		}

		if( !isValid(room) ) {
			alert(`room name ${room} can not be used!`);
			return;
		}

		socket.emit('create-room', {room_name:room}, ({ err, room_id }) => {
			if(err) {
				//TODO handle error, e.g. room name is alredy used or something
				alert(err);
				return;
			}

			alert(`room was successfully created, now You join it with https://defernus.com:3535/chat-room?room_id=${room_id}&name=${name}`);
			console.log(room_id, name)
		});


	}

	return (
		<form className='form-signin'>
			<input className='form-input-text form-input-top' type='text' placeholder='Your name' onChange={event => setName(event.target.value)} />
			<input className='form-input-text form-input-middle' type='text' placeholder='Room name' onChange={event => setRoom(event.target.value)}  />
			
			<button className='form-submit form-bottom' type='submit' onClick={createRoom}>Create room</button>
		</form>
	);
};

export default Start;
