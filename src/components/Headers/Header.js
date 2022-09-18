import React from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Path } from '../../enums/routes';
import './Header.css';

const Header = () => {
	return (
		<header className='header'>
			<div className='header__inner'>
				<Link to={Path.ROOT} className='header__logo'>
					Travel App
				</Link>
				<Navigation />
			</div>
		</header>
	);
};

export default Header;
