import { configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './user/reducer';
import { reducer as countriesReducer } from './countries/reducer';
import { reducer as bookingReducer } from './bookings/reducer';

export const store = configureStore({
	reducer: {
		user: userReducer,
		countries: countriesReducer,
		bookings: bookingReducer,
	},
});
