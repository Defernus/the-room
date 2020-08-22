import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import SOCKET_ENDPOINT from './Endpoint'
import Message from './Message'

import './Chat.css'

let socket;

const Chat = ({location}) => {
	const [name, setName] = useState('');
	const [room_id, setRoomID] = useState('');
	const [room_name, setRoomName] = useState('');

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
				alert(err);
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
				alert(err);
				return;
			}
		});

		setMessage('');
		document.getElementById('message-input').value='';
	};

	return (
		<div className='room-container'>
			<div className='room-info'>
				<h1>room: {room_name} your name: {name}</h1>
				<p>to invite your friends use https://defernus.com:3535/join-room?room_id={room_id}</p>
			</div>

			<div className='room-messages'>
				{messages.map((message, index) => (
					<div key={index}><Message value={message} /></div>
				))}
			</div>
			<div className='room-message-editor'>
				<form className='form-message'>
					<input className='form-message-input input-left' id='message-input' type='text' placeholder='Enter message' onChange={event => setMessage({ from: name, text: event.target.value })} />
					<button className='form-submit form-bottom' type='submit' onClick={event => {
						event.preventDefault();
						sendMessage(event);
					}}>Send</button>
				</form>
			</div>
		</div>
	);
};

export default Chat;
