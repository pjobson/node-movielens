var https       = require('https'),
	querystring = require('querystring');

var nodemovielens = {
	init: function(args) {
		args = args || {};
		// this.apiURL = 'https://movielens.org/api/';
		this.api = {
			hostname: 'movielens.org',
			port:     '443',
			headers:  {
				'Accept':           'application/json, text/plain, */*',
				'Accept-Encoding':  'gzip, deflate',
				'Accept-Language':  'en-US,en;q=0.5',
				'Cache-Control':    'no-cache',
				'Connection':       'keep-alive',
				'Content-Type':     'application/json;charset=utf-8',
				'DNT':              '1',
				'Host':             'movielens.org',
				'Pragma':           'no-cache',
				'User-Agent':       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:42.0) Gecko/20100101 Firefox/42.0'
			}
		};
		this.auth = {
			'userName': args.userName || '',
			'password': args.password || ''
		}
		this.login();
		console.log('--------------------------------\n',this,'\n--------------------------------');
	},
	setUsername: function(username) {

	},
	setPassword: function(password) {

	},
	login: function() {
		// https://movielens.org/api/sessions
		// {"userName":"root@example.com","password":"abc123"}
		var postData = JSON.stringify(this.auth);

		var options  = {
			hostname: this.api.hostname,
			port: this.api.port,
			path: '/api/sessions',
			method: 'POST',
			headers: this.api.headers
		};
		// Additional Headers
		options.headers['Referer']        = 'https://movielens.org/login';
		options.headers['Content-Length'] = postData.length;

		var that = this;
			that.loginData = '';
		var req = https.request(options, function(res) {
			// console.log('STATUS: ' + res.statusCode);
			// console.log('HEADERS: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				that.loginData += chunk;
			});
			res.on('end', function() {
				// Login Failure
				// { status: 'fail', message: 'authentication failed' }
				// Login Success
				// { status: 'success' }
				console.log(JSON.parse(that.loginData));
				console.log(res.headers);
			})
		});
		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});
		req.write(postData);
		req.end();

	},
	setCookie: function(headerData) {
		console.log()
	},
	getGenres: function() {
		// https://movielens.org/api/movies/genres
	},
	getMe: function() {
		// https://movielens.org/api/users/me
	},
	getMeTags: function() {
		// https://movielens.org/api/users/me/tags
	}
};


module.exports = nodemovielens;
