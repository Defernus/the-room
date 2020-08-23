import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
	<div className='container-center' >
		<h1 className='notfound-message' >404</h1>
		<h2 className='notfound-message' >room not found</h2>
		<Link className='notfound-link' to='/'>But you can create it!</Link>
	</div>
);

export default NotFound;
