import { createAsyncThunk } from '@reduxjs/toolkit';

const token = JSON.parse(window.localStorage.getItem('token'));

const fetchBookings = createAsyncThunk(
	'bookings/load',
	async (args, thunkAPI) => {
		try {
			const response = await fetch(
				'https://travel-app-api.glitch.me/api/v1/bookings',
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: 'Bearer ' + token,
					},
				}
			);
			let data = await response.json();

			if (response.status === 200) {
				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			console.log('Error', e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

const postBooking = createAsyncThunk(
	'bookings/post',
	async ({ tripId, userId, guests, date }, thunkAPI) => {
		try {
			const response = await fetch(
				'https://travel-app-api.glitch.me/api/v1/bookings',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
					body: JSON.stringify({
						tripId,
						userId,
						guests,
						date,
					}),
				}
			);
			let data = await response.json();

			if (response.status === 201) {
				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			console.log('Error', e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

const deleteBooking = createAsyncThunk(
	'bookings/delete',
	async ({ id }, thunkAPI) => {
		try {
			const response = await fetch(
				'https://travel-app-api.glitch.me/api/v1/bookings/' + id,
				{
					method: 'DELETE',
					headers: {
						Accept: '*/*',
						Authorization: 'Bearer ' + token,
					},
				}
			);
			let data = await response.json();

			if (response.status === 204) {
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			console.log('Error', e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export { fetchBookings, postBooking, deleteBooking };
