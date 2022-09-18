import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchCountries = createAsyncThunk(
	'countries/load',
	async (args, thunkAPI) => {
		try {
			const response = await fetch(
				'https://travel-app-api.glitch.me/api/v1/trips',
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization:
							'Bearer ' + JSON.parse(window.localStorage.getItem('token')),
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

export { fetchCountries };
