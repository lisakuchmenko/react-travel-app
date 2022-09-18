import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countries as tripsActionCreator } from '../../store/actions';
import Header from '../Headers/Header';
import TripCard from '../Trips/TripCard';

import './Main.css';

const Main = () => {
	const dispatch = useDispatch();

	const [filteredTrips, setFilteredTrips] = useState([]);
	let loaded = useSelector((state) => state.countries.loadedCountries);

	useEffect(() => {
		dispatch(tripsActionCreator.fetchCountries());
	}, [dispatch]);

	const countries = useSelector((state) => state.countries.countries);

	useEffect(() => {
		setFilteredTrips(countries);
	}, [loaded]);

	const handleSearch = (event) => {
		let value = event.target.value.trim();
		value = value.charAt(0).toUpperCase() + value.slice(1);
		let result = [];

		result = countries.filter((data) => {
			return data.title.search(value) !== -1;
		});
		setFilteredTrips(result);
	};

	const filteringDuration = (event) => {
		let duration = event.target.value;
		if (duration === '0_x_5') {
			setFilteredTrips(countries.filter((data) => data.duration < 5));
		} else if (duration === '5_x_10') {
			setFilteredTrips(
				countries.filter((data) => data.duration >= 5 && data.duration < 10)
			);
		} else if (duration === '10_x') {
			setFilteredTrips(countries.filter((data) => data.duration >= 10));
		}
	};

	const filteringLevel = (event) => {
		let level = event.target.value;
		if (level === 'easy') {
			setFilteredTrips(countries.filter((data) => data.level === 'easy'));
		} else if (level === 'moderate') {
			setFilteredTrips(countries.filter((data) => data.level === 'moderate'));
		} else if (level === 'difficult') {
			setFilteredTrips(countries.filter((data) => data.level === 'difficult'));
		}
	};

	return (
		<>
			<Header />
			<main>
				<h1 className='visually-hidden'>Travel App</h1>
				<section className='trips-filter'>
					<h2 className='visually-hidden'>Trips filter</h2>
					<form className='trips-filter__form' autoComplete='off'>
						<label className='trips-filter__search input'>
							<span className='visually-hidden'>Search by name</span>
							<input
								name='search'
								type='search'
								placeholder='search by title'
								onChange={(event) => handleSearch(event)}
							/>
						</label>
						<label className='select'>
							<span className='visually-hidden'>Search by duration</span>
							<select name='duration' onChange={filteringDuration}>
								<option value=''>duration</option>
								<option value='0_x_5'>&lt; 5 days</option>
								<option value='5_x_10'>&lt; 10 days</option>
								<option value='10_x'>&ge; 10 days</option>
							</select>
						</label>
						<label className='select'>
							<span className='visually-hidden'>Search by level</span>
							<select name='level' onChange={filteringLevel}>
								<option value=''>level</option>
								<option value='easy'>easy</option>
								<option value='moderate'>moderate</option>
								<option value='difficult'>difficult</option>
							</select>
						</label>
					</form>
				</section>
				<section className='trips'>
					<h2 className='visually-hidden'>Trips List</h2>
					<ul className='trip-list'>
						{filteredTrips.map((trip) => (
							<TripCard data={trip} key={trip.id} />
						))}
					</ul>
				</section>
			</main>
		</>
	);
};

export default Main;
