import React from 'react';

const JoinErr = ({join_err}) => {
	if(join_err) {
		return (
			<p className='err'>failed to join, such name is alredy used!</p>
		);
	}
	return (<div></div>);
}

export default JoinErr;
