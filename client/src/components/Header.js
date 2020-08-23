import React from 'react';
import { Link } from 'react-router-dom';

import CloseIcon from './close-icon.svg';

const Header = ({room_name, room_id}) => {
	const link = `https://defernus.com:3535/join-chat?room_id=${room_id}`;

	return (
		<div className='room-info'>
			<h1 className='info-room-name'>{room_name}</h1>
			<div className='info-invite'>
				<h2>invite link</h2>
				<input id='invite-link' className='info-invite-link' disabled="disabled" value={link} />
			</div>
			<Link to='/' className='info-leave'><img className='info-close-icon' src={CloseIcon} /></Link>
		</div>
	);
};

export default Header;
