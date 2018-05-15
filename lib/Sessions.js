const REST     = require('./REST.js');

const Login = async (auth) => {
	const path = '/api/sessions';

	const headers = {
		'Referer': 'https://movielens.org/login'
	};

	const x = await REST.Poster(path, {}, auth, headers);
	return new Promise(resolve => {
		console.log(x);
		resolve(x);
	});
};

const Logout = async () => {
	//
};

const GetAuthCookie = async () => {
	//
};

module.exports =  { Login };
