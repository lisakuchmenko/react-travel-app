import React from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../enums/routes';
import './Header.css';

const HeaderNonLogin = () => {
	return (
		<header className='Header'>
			<div className='header__inner'>
				<Link to={Path.ROOT} className='header__logo'>
					Travel App
				</Link>
			</div>
		</header>
	);
};

export default HeaderNonLogin;
