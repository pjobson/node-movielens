const queryString = require('query-string');
const https       = require('https');

const options = {
	hostname: 'movielens.org',
	port:     '443',
	headers:  {
		'Accept':           'application/json, text/plain, */*',
		'Accept-Encoding':  'gzip, deflate, br',
		'Accept-Language':  'en-US,en;q=0.5',
		'Cache-Control':    'no-cache',
		'Connection':       'keep-alive',
		'Content-Type':     'application/json;charset=utf-8',
		'DNT':              '1',
		'Host':             'movielens.org',
		'Pragma':           'no-cache',
		'User-Agent':       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:42.0) Gecko/20100101 Firefox/42.0',
	}
};


const Getter = (path, queryParams={}, cookie='') => {
	const getter = this;
	const qs = queryString.stringify(queryParams);

	path = `${path}?${qs}`.replace(/\?$/,'');
	const opts  = Object.assign({
		path:   path,
		method: 'GET'
	}, options);
	opts.headers = Object.assign({ Cookie: cookie }, opts.headers);

	return new Promise((resolve, reject) => {
		let getData = '';
		const req = https.request(opts, res => {
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				getData += chunk;
			});

			res.on('end', () => {
				if (getData.status==='fail') {
					reject(getData);
				} else {
					resolve({
						response: JSON.parse(getData)
					});
				}
			});
		});
		req.on('error', function(err) {
			// This only happens if a timeout occured or something weird happened
			reject(err);
		});
		req.end();
	});
};

const Putter = async () => {
	//
};

const Deleter = async (path, queryParams={}, postBody={}, headers={}) => {
	//
};

const Poster = async (path, queryParams={}, postBody={}, headers={}) => {
	const poster = this;
	const qs = queryString.stringify(queryParams);
	path = `${path}?${qs}`.replace(/\?$/,'');
	postBody = JSON.stringify(postBody);
	headers = Object.assign(headers, {
		'Content-Length': Buffer.byteLength(postBody,'utf8')
	});
	const opts  = Object.assign({
		path:   path,
		method: 'POST'
	}, options);
	opts.headers = Object.assign(headers, opts.headers);
	return new Promise((resolve, reject) => {
		let postData = '';
		const req = https.request(opts, res => {
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				postData += chunk;
			});

			res.on('end', () => {
				if (postData.status==='fail') {
					reject(postData);
				} else {
					if (res.headers['set-cookie']) {
						resolve({
							response: JSON.parse(postData),
							cookie: res.headers['set-cookie'][0]
						});
					} else {
						resolve({
							response: JSON.parse(postData)
						});
					}
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
			reject(err);
		});
		req.write(postBody);
		req.end();
	});
};

module.exports = { Getter, Putter, Poster };
