import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Header from '../Headers/Header';
import Modal from './Modal';
import './TripPage.css';

const TripPage = () => {
	const { tripID } = useParams();

	const trips = useSelector((state) => state.countries.countries);
	const trip = trips.find((el) => el.id === tripID);

	const { image, title, duration, level, description, price } = trip;

	const [isOpen, setIsOpen] = useState(false);

	const updateModal = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<>
			<Header />
			<main className='trip-page'>
				<h1 className='visually-hidden'>Travel App</h1>
				<div className='trip'>
					<img src={image} className='trip__img' alt='trip-image' />
					<div className='trip__content'>
						<div className='trip-info'>
							<h3 className='trip-info__title'>{title}</h3>
							<div className='trip-info__content'>
								<span className='trip-info__duration'>
									<strong>{duration}</strong> days
								</span>
								<span className='trip-info__level'>{level}</span>
							</div>
						</div>
						<div className='trip__description'>{description}</div>

						<div className='trip-price'>
							<span>Price</span>
							<strong className='trip-price__value'>{price} $</strong>
						</div>
						<button className='trip__button button' onClick={updateModal}>
							Book a trip
						</button>
					</div>
				</div>
			</main>
			{isOpen && <Modal updateModal={updateModal} trip={trip} />}
		</>
	);
};

export default TripPage;
