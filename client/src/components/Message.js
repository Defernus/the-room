import React from 'react';

import './Message.css'

const Message = ({value}) => (
	<div className='message-body'>
		<div className='message-from'>{value.user}</div>
		<div className='message-text'>{value.text}</div>
	</div>
);

export default Message;
