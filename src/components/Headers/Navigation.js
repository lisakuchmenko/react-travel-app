import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Path } from '../../enums/routes';
import { user as userActionCreator } from '../../store/actions';
import './Navigation.css';
import briefcase from '../../images/briefcase.svg';
import user from '../../images/user.svg';

const Navigation = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleClick = (e) => {
		e.preventDefault();
		dispatch(userActionCreator.logOut());
	};

	const loggedIn = useSelector((state) => state.user.loggedIn);

	useEffect(() => {
		if (!loggedIn) {
			window.localStorage.removeItem('token');
			navigate('/sign-in');
		}
	}, [loggedIn]);

	let userName = useSelector((state) => state.user.userInfo.fullName);

	return (
		<nav className='header__nav'>
			<ul className='nav-header__list'>
				<li className='nav-header__item' title='Bookings'>
					<Link to={Path.BOOKINGS} className='nav-header__inner'>
						<span className='visually-hidden'>Bookings</span>
						<img src={briefcase} alt=' icon' />
					</Link>
				</li>
				<li className='nav-header__item' title='Profile'>
					<div className='nav-header__inner profile-nav' tabIndex='0'>
						<span className='visually-hidden'>Profile</span>
						<img src={user} alt='profile icon' />
						<ul className='profile-nav__list'>
							<li className='profile-nav__item profile-nav__username'>
								{userName}
							</li>
							<li className='profile-nav__item'>
								<button
									className='profile-nav__sign-out button'
									onClick={handleClick}
								>
									Sign Out
								</button>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
