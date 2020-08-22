import React from 'react';


const Messages = ({messages}) => (
	<div>
		{messages.map( (message, index) => (
			<div key={index} className='room-messages'>
				<div className='message-body'>
					<div className='message-from'>{message.from}</div>
					<div className='message-text'>{message.text}</div>
				</div>
			</div>
		))}
	</div>
);

export default Messages;
