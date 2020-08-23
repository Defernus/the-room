import React from 'react';


const Input = ({message, setMessage, sendMessage}) => (
	<div className='room-message-editor'>
		<form className='form-message'>
			<input
				className='form-input-message'
				id='message-input'
				type='text'
				placeholder='Enter message'
				onChange={event => setMessage(event.target.value)}
			/>
			<button className='form-send' type='submit' onClick={event => {
				event.preventDefault();
				if(message) {
					sendMessage(event);
				}
			}}>Send</button>
		</form>
	</div>
);

export default Input;
