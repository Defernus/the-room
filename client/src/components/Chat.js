import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';


import SOCKET_ENDPOINT from './Endpoint'

import Header from './Header'
import Messages from './Messages'
import Input from './Input'
import Loading from './Loading'


let socket;

const Chat = ({location}) => {
	const [name, setName] = useState('');
	const [room_id, setRoomID] = useState('');
	const [room_name, setRoomName] = useState('');
	const [room_err, setRoomErr] = useState('');

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		//get username and room id from url
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
		socket.emit('sendMessage', { text: message }, err => {
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
				<div className='chat-container'>
					<Header room_name={room_name} room_id={room_id} />
					<Messages messages={messages} name={name} />
					<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
				</div>
			</div>
		);
	}

	//loading page render
	return (
		<Loading />
	);
};

export default Chat;
