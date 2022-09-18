import { createReducer } from '@reduxjs/toolkit';
import { registerUser, logUser } from './actions';

const authInitialState = {
	loading: false,
	userInfo: {}, // for user object
	userToken: null, // for storing the JWT
	loggedIn: false,
	error: null,
};

const reducer = createReducer(authInitialState, (builder) => {
	builder.addCase(registerUser.fulfilled, (state, { payload }) => {
		const { user, token } = payload;
		state.userInfo = user;
		state.userToken = token;
		state.loggedIn = true;
	});
	builder.addCase(registerUser.pending, (state) => {
		state.loading = true;
		state.loggedIn = false;
	});
	builder.addCase(registerUser.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = payload;
		state.loggedIn = false;
	});
	builder.addCase(logUser.fulfilled, (state, { payload }) => {
		const { user, token } = payload;
		state.userInfo = user;
		state.userToken = token;
		state.loggedIn = true;
	});
	builder.addCase(logUser.pending, (state) => {
		state.loading = true;
		state.loggedIn = false;
	});
	builder.addCase(logUser.rejected, (state, { payload }) => {
		state.loading = false;
		state.loggedIn = false;
		state.error = payload;
	});
	builder.addCase('user/log-out', (state) => {
		state.loading = false;
		state.userInfo = {}; // for user object
		state.userToken = null;
		state.loggedIn = false;
		state.error = null;
	});
});

export { reducer };
