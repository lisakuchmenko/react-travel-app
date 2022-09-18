export const nameValidator = (name) => {
	let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
	return regName.test(name);
};

export const emailValidator = (email) => {
	const regEmail = /\S+@\S+\.\S+/;
	return regEmail.test(email);
};

export const passwordValidator = (password) => {
	return password.length >= 2 && password.length <= 19;
};
