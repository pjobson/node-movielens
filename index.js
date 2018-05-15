const Account  = require('./lib/Account.js');
const Actions  = require('./lib/Actions.js');
const Expolore = require('./lib/Explore.js');
const Sessions = require('./lib/Sessions.js');
const Tag      = require('./lib/Tag.js');

class MovieLens {
	constructor(auth={}) {
		const ML = this;

		ML.setAuth(auth);
	};

	setAuth(auth) {
		if (Object.keys(auth).length === 2) {
			this.auth = auth;
		}
	};

	async login() {
		const sessionLogin = await Sessions.Login(this.auth);
	};
	async logout() {
		const sessionLogout = await Sessions.Logout();
	}
};


module.exports = MovieLens;
