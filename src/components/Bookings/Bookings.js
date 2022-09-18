import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookings as bookActionCreator } from '../../store/actions';

import Header from '../Headers/Header';
import './Bookings.css';

const Bookings = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(bookActionCreator.fetchBookings());
	}, [dispatch]);

	const bookings = useSelector((state) => state.bookings.bookings);
	let displayedBookings = bookings.slice();

	const [needUpdate, setNeedUpdate] = useState(false);
	const removeBooking = (id) => {
		dispatch(bookActionCreator.deleteBooking({ id }));
		setNeedUpdate(true);
	};

	useEffect(() => {
		dispatch(bookActionCreator.fetchBookings());
		setNeedUpdate(false);
	}, [needUpdate]);

	return (
		<>
			<Header />
			<main className='bookings-page'>
				<h1 className='visually-hidden'>Travel App</h1>
				<ul className='bookings__list'>
					{displayedBookings
						.sort((a, b) => new Date(a.date) - new Date(b.date))
						.map((trip) => {
							let date = new Date(trip.date).toLocaleDateString();

							return (
								<li className='booking' key={trip.id}>
									<h3 className='booking__title'>{trip.title}</h3>
									<span className='booking__guests'>{trip.guests} guests</span>
									<span className='booking__date'>{date}</span>
									<span className='booking__total'>{trip.trip.price} $</span>
									<button
										className='booking__cancel'
										title='Cancel booking'
										onClick={() => removeBooking(trip.id)}
									>
										<span className='visually-hidden'>Cancel booking</span>×
									</button>
								</li>
							);
						})}
				</ul>
			</main>{' '}
		</>
	);
};

export default Bookings;
