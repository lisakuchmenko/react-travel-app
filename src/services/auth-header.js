export const authHeader = () => {
	const token = JSON.parse(window.localStorage.getItem('token'));

	if (token) {
		return { Authorization: 'Bearer ' + token };
	} else {
		return {};
	}
};
