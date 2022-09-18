import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookings as bookActionCreator } from '../../store/actions';

const Modal = ({ trip, updateModal }) => {
	const { title, duration, level, price, id } = trip;
	const [guests, setGuests] = useState(1);
	const [totalPrice, setTotalPrice] = useState(price);

	useEffect(() => {
		setTotalPrice(price * Number(guests));
	}, [guests]);

	const handleChange = (event) => {
		setGuests(event.target.value);
	};

	const handleDateChange = (event) => {
		let selectedDate = event.target.value;
		isInTheFuture(selectedDate);
	};

	const [validation, setValidation] = useState(false);

	const isInTheFuture = (selectedDate) => {
		const today = new Date();
		const date = new Date(selectedDate);
		today.setHours(23, 59, 59, 998);

		setValidation(date > today);
	};

	const dispatch = useDispatch();
	const userId = useSelector((state) => state.user.userInfo.id);

	const handleClick = (e) => {
		e.preventDefault();

		if (validation) {
			const date = document.querySelector('input[type=date]').value;
			dispatch(
				bookActionCreator.postBooking({
					tripId: id,
					userId: userId,
					guests: guests,
					date: date,
				})
			);
			updateModal();
		}
	};

	return (
		<div className='modal'>
			<div className='trip-popup'>
				<button className='trip-popup__close' onClick={updateModal}>
					×
				</button>
				<form className='trip-popup__form' autoComplete='off'>
					<div className='trip-info'>
						<h3 className='trip-info__title'>{title}</h3>
						<div className='trip-info__content'>
							<span className='trip-info__duration'>
								<strong>{duration}</strong> days
							</span>
							<span className='trip-info__level'>{level}</span>
						</div>
					</div>
					<label className='trip-popup__input input'>
						<span className='input__heading'>Date</span>
						<input
							name='date'
							type='date'
							onChange={handleDateChange}
							required
						/>
					</label>
					<label className='trip-popup__input input'>
						<span className='input__heading'>Number of guests</span>
						<input
							name='guests'
							type='number'
							min='1'
							max='10'
							value={guests}
							onChange={handleChange}
							onKeyDown={(e) => {
								e.preventDefault();
							}}
							required
						/>
					</label>
					<span className='trip-popup__total'>
						Total:{' '}
						<output className='trip-popup__total-value'>{totalPrice}$</output>
					</span>
					<button className='button' type='submit' onClick={handleClick}>
						Book a trip
					</button>
				</form>
			</div>
		</div>
	);
};

export default Modal;
