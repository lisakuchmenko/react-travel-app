import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user as userActionCreator } from '../../store/actions';
import { Link, useNavigate } from 'react-router-dom';
import { Path } from '../../enums/routes';
import HeaderNonLogin from '../Headers/HeaderNonLogin.js';
import {
	nameValidator,
	emailValidator,
	passwordValidator,
} from '../../validators/inputValidators.js';
import './Sign.css';

const SignUp = () => {
	const [form, setForm] = useState({
		fullName: '',
		email: '',
		password: '',
		valid: false,
	});

	const onUpdateField = (e) => {
		let valid =
			nameValidator(form.fullName) &&
			emailValidator(form.email) &&
			passwordValidator(form.password);
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
		dispatch(userActionCreator.registerUser(form));
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
			<main className='sign-up-page'>
				<h1 className='visually-hidden'>Travel App</h1>
				<form className='sign-up-form' autoComplete='off'>
					<h2 className='sign-up-form__title'>Sign Up</h2>
					<label className='trip-popup__input input'>
						<span className='input__heading'>Full name</span>
						<input
							name='fullName'
							type='text'
							onChange={onUpdateField}
							required
						/>
					</label>
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
						Sign Up
					</button>
				</form>
				<span>
					Already have an account?
					<Link to={Path.SIGN_IN} className='sign-up-form__link'>
						Sign In
					</Link>
				</span>
			</main>
		</>
	);
};

export default SignUp;
