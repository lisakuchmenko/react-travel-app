import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { user as userActionCreator } from '../../store/actions';
import { Path } from '../../enums/routes';
import HeaderNonLogin from '../Headers/HeaderNonLogin.js';

import {
	emailValidator,
	passwordValidator,
} from '../../validators/inputValidators.js';
import './Sign.css';

const SignIn = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
		valid: false,
	});

	const onUpdateField = (e) => {
		let valid = emailValidator(form.email) && passwordValidator(form.password);
		const nextFormState = {
			...form,
			[e.target.name]: e.target.value,
			valid: valid,
		};
		setForm(nextFormState);
	};
	const dispatch = useDispatch();

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(userActionCreator.logUser(form));
	};

	const loggedIn = useSelector((state) => state.user.loggedIn);

	const navigate = useNavigate();
	useEffect(() => {
		if (loggedIn) {
			navigate('/');
		}
	}, [loggedIn]);

	return (
		<>
			<HeaderNonLogin />
			<main className='sign-in-page'>
				<h1 className='visually-hidden'>Travel App</h1>
				<form className='sign-in-form' autoComplete='off'>
					<h2 className='sign-in-form__title'>Sign In</h2>
					<label className='trip-popup__input input'>
						<span className='input__heading'>Email</span>
						<input
							name='email'
							type='email'
							onChange={onUpdateField}
							required
						/>
					</label>
					<label className='trip-popup__input input'>
						<span className='input__heading'>Password</span>
						<input
							name='password'
							type='password'
							autoComplete='new-password'
							onChange={onUpdateField}
							required
						/>
					</label>
					<button className='button' type='submit' onClick={handleClick}>
						Sign In
					</button>
				</form>
				<span>
					Don't have an account?
					<a href={Path.SIGN_UP} className='sign-in-form__link'>
						Sign Up
					</a>
				</span>
			</main>
		</>
	);
};

export default SignIn;
