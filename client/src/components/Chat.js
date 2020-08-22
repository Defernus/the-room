import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import Message from './Message'

import './Chat.css'

const SOCKET_ENDPOINT = "defernus.com:2525"

const Chat = ({location}) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const {name, room} = queryString.parse(location.search);

		setName(name);
		setRoom(room);
	
	}, [location.search]);

	const sendMessage = event => {
		console.log(message);
		setMessages([...messages, message]);
		setMessage('');
		document.getElementById('message-input').value='';
	};

	return (
		<div className='room-container'>
			<div className='room-info'>
				<h1>{room} {name}</h1>
			</div>

			<div className='room-messages'>
				{messages.map((message, index) => (
					<div key={index}><Message value={message} /></div>
				))}
			</div>
			<div className='room-message-editor'>
				<form className='form-message'>
					<input className='form-message-input input-left' id='message-input' type='text' placeholder='Enter message' onChange={event => setMessage({user:name, text:event.target.value})} />
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
