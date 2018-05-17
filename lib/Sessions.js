const REST     = require('./REST.js');

const Login = async (auth) => {
	const path = '/api/sessions';

	const headers = {
		'Referer': 'https://movielens.org/login'
	};

	const response = await REST.Poster(path, {}, auth, headers);
	return new Promise(resolve => {
		resolve(response);
	});
};

const Logout = async () => {
	//
};

module.exports =  { Login, Logout };
