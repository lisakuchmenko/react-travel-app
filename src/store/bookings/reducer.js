import { createReducer } from '@reduxjs/toolkit';
import { fetchBookings, postBooking, deleteBooking } from './actions';

const authInitialState = {
	loading: false,
	bookings: [],
	error: null,
	added: false,
};

const reducer = createReducer(authInitialState, (builder) => {
	builder.addCase(fetchBookings.fulfilled, (state, { payload }) => {
		state.bookings = payload;
	});
	builder.addCase(fetchBookings.pending, (state) => {
		state.loading = true;
	});
	builder.addCase(fetchBookings.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = payload;
	});
	builder.addCase(postBooking.fulfilled, (state) => {
		state.added = true;
	});
	builder.addCase(postBooking.pending, (state) => {
		state.loading = true;
	});
	builder.addCase(postBooking.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = payload;
	});
	builder.addCase(deleteBooking.fulfilled, (state) => {
		state.loading = false;
	});
	builder.addCase(deleteBooking.pending, (state) => {
		state.loading = true;
	});
	builder.addCase(deleteBooking.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = payload;
	});
});

export { reducer };
