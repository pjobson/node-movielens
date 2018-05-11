var https        = require('https'),
	querystring  = require('querystring');


var NodeMovieLens = {
	init: function() {
		// https://movielens.org/api/
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

		return this;
	},
	// Set Auth Cookie Method
	// More effective than constantly logging in
	setAuthCookie: function(cookie,callback) {
		var expiresEpoch = new Date(cookie.match(/Expires=(.+?);/)[1]).getTime();
		var nowEpoch     = new Date().getTime();
		// Return expired if cookie is no longer valid
		if (expiresEpoch <= nowEpoch) {
			callback('expired');
		} else {
			this.authCookie = cookie;
			callback('success')
		}
	},
	// Get Auth Cookie Method
	// Returns the Auth Cookie
	getAuthCookie: function(callback) {
		return callback(this.authCookie);
	},
	// Login Method
	login: function(auth,callback) {
		// https://movielens.org/api/sessions
		// {"userName":"root@example.com","password":"abc123"}
		var self = this;
		self.auth = auth || {};
		self.auth = {
			'userName': auth.username || '',
			'password': auth.password || '',
		}
		var postData = JSON.stringify(self.auth);

		var options  = {
			hostname: self.api.hostname,
			port: self.api.port,
			path: '/api/sessions',
			method: 'POST',
			headers: self.api.headers
		};
		// Additional Headers
		options.headers['Referer']        = 'https://movielens.org/login';
		options.headers['Content-Length'] = Buffer.byteLength(postData,'utf8');

		var loginData = '';
		var req = https.request(options, function(res) {
			// console.log('STATUS: ' + res.statusCode);
			// console.log('HEADERS: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				loginData += chunk;
			});
			res.on('end', function() {
				// Login Failure
				// { status: 'fail', message: 'authentication failed' }
				// Login Success
				// { status: 'success' }
				loginData = JSON.parse(loginData);
				if (loginData.status==='fail') {
					self.loginStatusUpdater(callback,loginData);
				} else {
					self.loginStatusUpdater(callback,loginData,res.headers);
				}
			});
		});
		req.on('error', function(err) {
			// This only happens if a timeout occured or something weird happened
			/*
				{ [Error: getaddrinfo ENOTFOUND movielensx.org]
				  code: 'ENOTFOUND',
				  errno: 'ENOTFOUND',
				  syscall: 'getaddrinfo',
				  hostname: 'movielensx.org',
				  status: 'fail' }
			*/
			err.status = 'fail';
			self.loginStatusUpdater(callback,err);
		});
		req.write(postData);
		req.end();
	},
	// Updates login status stuff
	loginStatusUpdater: function(callback,msg,headers) {
		var self = this;
		if (msg.status === 'success') {
			self.authCookie = headers['set-cookie'][0];
		}
		callback(msg);
	},
	// Generic GETter function
	// I should probably put the login stuff here, but I don't really feel like it.
	getter: function(callback,path,queryStr) {
		var self = this;
		queryStr = queryStr || '';

		var options  = {
			hostname: self.api.hostname,
			port: self.api.port,
			path: path+'?'+queryStr,
			method: 'GET',
			headers: self.api.headers
		};
		// Additional Headers
		options.headers['Cookie'] = this.authCookie;

		var resData = '';
		var req = https.request(options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				resData += chunk;
			});
			res.on('end', function() {
				callback(resData);
			});
		});
		req.end();

	},
	// Generic POSTter function
	poster: function(callback,path,postBody) {
		var self = this;
		postBody = postBody || '';
		var pBody = JSON.stringify(postBody);
		var options  = {
			hostname: self.api.hostname,
			port: self.api.port,
			path: path,
			method: 'POST',
			headers: self.api.headers
		};
		// Additional Headers
		options.headers['Cookie'] = this.authCookie;
		options.headers['Content-Length'] = pBody.length;
		options.headers['Referer'] = 'https://movielens.org/movies/'+ postBody.movieId

		var resData = '';
		var req = https.request(options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				resData += chunk;
			});
			res.on('end', function() {
				callback(resData);
			});
		});
		req.on('error', (e) => {
			console.error(e);
		});
		req.write(pBody);
		req.end();
	},
	// Post Tags
	postTags: function(paramsObj, callback) {
		// https://movielens.org/api/users/me/tags
		// Request Payload: {"movieId":id,"tag":"tag"}
		paramsObj.movieId = parseInt(paramsObj.movieId,10);
		this.poster(callback, '/api/users/me/tags', paramsObj);
	},
	// Get Genres
	// Returns a list of genres
	getGenres: function(callback) {
		// https://movielens.org/api/movies/genres
		this.getter(callback,'/api/movies/genres');
	},
	// Get My User Info
	// Gets your user info
	getMe: function(callback) {
		// https://movielens.org/api/users/me
		this.getter(callback,'/api/users/me');
	},
	// Get My Tags
	// Gets tags you've set
	getMyTags: function(callback) {
		// https://movielens.org/api/users/me/tags
		this.getter(callback,'/api/users/me/tags');
	},
	// Get Movie Tags
	// Gets tags for a movie
	getMovieTags: function(paramsObj,callback) {
		// https://movielens.org/api/movies/3702/tags
		// Request Payload: {"movieId":id}
		this.getter(callback, '/api/movies/'+ paramsObj.movieId +'/tags');
	},
	// explore
	// Query engine.
	explore: function(paramsObj,callback) {
		// https://movielens.org/api/movies/explore
		this.getter(callback,'/api/movies/explore',querystring.stringify(paramsObj));
	},
	// Top Picks
	topPicks: function(callback) {
		// https://movielens.org/api/movies/explore?hasRated=no&sortBy=prediction
		var paramsObj = {
			hasRated: 'no',
			sortBy: 'prediction'
		};
		this.getter(callback,'/api/movies/explore',querystring.stringify(paramsObj));
	},
	// Recent Releases
	recentReleases: function(callback) {
		// https://movielens.org/api/movies/explore?hasRated=no&maxDaysAgo=90&maxFutureDays=0&sortBy=releaseDate
		var paramsObj = {
			hasRated: 'no',
			maxDaysAgo: 90,
			maxFutureDays: 0,
			sortBy: 'releaseDate'
		};
		this.getter(callback,'/api/movies/explore',querystring.stringify(paramsObj));
	},
	// Favorites within the last year
	favoritesYear: function(callback) {
		// https://movielens.org/api/movies/explore?hasRated=no&maxDaysAgo=365&maxFutureDays=0&minPop=100&sortBy=avgRating
		var paramsObj = {
			hasRated: 'no',
			maxDaysAgo: 365,
			maxFutureDays: 0,
			minPop: 100,
			sortBy: 'avgRating'
		};
		this.getter(callback,'/api/movies/explore',querystring.stringify(paramsObj));
	},
	// New Additions
	newAdditions: function(callback) {
		// https://movielens.org/api/movies/explore?sortBy=dateAdded
		var paramsObj = {
			sortBy: 'dateAdded'
		};
		this.getter(callback,'/api/movies/explore',querystring.stringify(paramsObj));
	},
	// Movies you've rated
	yourRatings: function(callback) {
		// https://movielens.org/api/movies/explore?hasRated=yes&sortBy=userRatedDate
		var paramsObj = {
			hasRated: 'yes',
			sortBy: 'userRatedDate'
		};
		this.getter(callback,'/api/movies/explore',querystring.stringify(paramsObj));
	},
	// Your wishlist
	yourWishlist: function(callback) {
		// https://movielens.org/api/movies/explore?hasWishlisted=yes&sortBy=userListedDate
		var paramsObj = {
			hasWishlisted: 'yes',
			sortBy: 'userListedDate'
		};
		this.getter(callback,'/api/movies/explore',querystring.stringify(paramsObj));
	},
	// Your hidden list
	yourHidden: function(callback) {
		// https://movielens.org/api/movies/explore?hasHidden=yes
		var paramsObj = {
			hasHidden: 'yes'
		};
		this.getter(callback,'/api/movies/explore',querystring.stringify(paramsObj));
	}
};

module.exports = NodeMovieLens.init();

