import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Loader from 'react-loader-spinner';


import SOCKET_ENDPOINT from './Endpoint'
import Messages from './Messages'


let socket;

const Chat = ({location}) => {
	const [name, setName] = useState('');
	const [room_id, setRoomID] = useState('');
	const [room_name, setRoomName] = useState('');
	const [room_err, setRoomErr] = useState('');

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const {room_id, name} = queryString.parse(location.search);

		setName(name);
		setRoomID(room_id);
	
		socket = io(SOCKET_ENDPOINT);

		socket.emit('join', { room_id, user_name: name }, ({err, room_name}) => {
			if(err) {
				//TODO handle errors e.g. redirect to somewher when room doesn`t found or name is alredy used
				setRoomErr(err);
				return;
			}

			setRoomName(room_name);
		});
	}, [location.search]);

	useEffect( () => {
		socket.off('message');
		socket.on('message', message => {
			console.log(message);
			setMessages([...messages, message]); 
		});
	}, [messages]);

	const sendMessage = event => {
		socket.emit('sendMessage', { text: message.text }, err => {
			if(err) {
				//TODO handle errors
				setRoomErr(err);
				return;
			}
		});

		setMessage('');
		document.getElementById('message-input').value='';
	};

	//when some error happened   e.g. room does not exist or user name is alredy used
	if(room_err) {
		return (
			<div>
				<p>failed to join room: {room_err}</p>
			</div>
		);
	}

	//when ok render chat page
	if(room_name) {
		return (
			<div className='room-container'>
				<div className='room-info'>
					<h1>room: {room_name} your name: {name}</h1>
					<p>to invite your friends use https://defernus.com:3535/join-room?room_id={room_id}</p>
				</div>

				<Messages messages={messages} />

				<div className='room-message-editor'>
					<form className='form-message'>
						<input
							className='form-input-text form-input-left'
							id='message-input'
							type='text'
							placeholder='Enter message'
							onChange={event => setMessage({ from: name, text: event.target.value })}
						/>
						<button className='form-submit form-input-right' type='submit' onClick={event => {
							event.preventDefault();
							if(message) {
								sendMessage(event);
							}
						}}>Send</button>
					</form>
				</div>
			</div>
		);
	}

	//loading page render
	return (
		<div className='container-center'>
			<Loader
				type="Puff"
				color="#00BFFF"
				height={100}
				width={100}
			/>
		</div>
	);
};

export default Chat;
