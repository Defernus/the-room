import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';


const Messages = ({messages, name}) => (
	<ScrollToBottom className='messages-container'>
		{messages.map( (message, index) => {

			if(index && message.from === messages[index-1].from) {
				return (
					<div key={index} className='message-body'>
						<div className={message.from===name? 'message-text message-from-user' : 'message-text'}>{message.text}</div>
					</div>
				);
			}
			return (
				<div key={index}>
					<div className='message-body'>
						<div className={message.from===name? 'message-from message-from-user' : 'message-from'}>{message.from}</div>
					</div>                                                                    
					<div className='message-body'>                                            
						<div className={message.from===name? 'message-text message-from-user' : 'message-text'}>{message.text}</div>
					</div>
				</div>
			);
		})}
	</ScrollToBottom>
);

export default Messages;
