import React from 'react';
import Header from '../Headers/Header';
import './NotFound.css';

const NotFound = () => {
	return (
		<>
			<Header />
			<div className='NotFound'>
				Ooops, this page doesn't exist, try one more time!
			</div>
		</>
	);
};
export default NotFound;
