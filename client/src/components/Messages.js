import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';


const Messages = ({messages}) => (
	<ScrollToBottom className='messages-container'>
		{messages.map( (message, index) => (
			<div key={index} className='message-body'>
				<div className='message-from'>{message.from}</div>
				<div className='message-text'>{message.text}</div>
			</div>
		))}
	</ScrollToBottom>
);

export default Messages;
