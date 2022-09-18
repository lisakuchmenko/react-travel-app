import { createReducer } from '@reduxjs/toolkit';
import { fetchCountries } from './actions';

const authInitialState = {
	loadedCountries: false,
	loading: false,
	countries: [],
	error: null,
};

const reducer = createReducer(authInitialState, (builder) => {
	builder.addCase(fetchCountries.fulfilled, (state, { payload }) => {
		state.countries = payload;
		state.loadedCountries = true;
	});
	builder.addCase(fetchCountries.pending, (state) => {
		state.loading = true;
	});
	builder.addCase(fetchCountries.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = payload;
	});
});

export { reducer };
