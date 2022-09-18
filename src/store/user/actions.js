import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

const registerUser = createAsyncThunk(
	'user/register',
	async ({ fullName, email, password }, thunkAPI) => {
		try {
			const response = await fetch(
				'https://travel-app-api.glitch.me/api/v1/auth/sign-up',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						fullName,
						email,
						password,
					}),
				}
			);
			let data = await response.json();

			if (response.status === 201) {
				window.localStorage.setItem('token', JSON.stringify(data.token));
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

const logUser = createAsyncThunk(
	'user/log-in',
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await fetch(
				'https://travel-app-api.glitch.me/api/v1/auth/sign-in',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email,
						password,
					}),
				}
			);
			let data = await response.json();

			if (response.status === 200) {
				window.localStorage.setItem('token', JSON.stringify(data.token));
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

const logOut = createAction('user/log-out');

export { registerUser, logUser, logOut };
