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


const Getter = (path, queryParams={}, headers={}) => {
	// const getter = this;
	// const qs = queryString.stringify(queryParams);

	// const options  = {
	// 	hostname: config.hostname,
	// 	port:     config.port,
	// 	path:     `${path}?${qs}`,
	// 	method:   'GET',
	// 	headers:  Object.assign(headers, config.headers)
	// };

	// console.log('Getter', options);

	// return new Promise(resolve => {
	// 	setTimeout(() => {
	// 		resolve('resolved');
	// 	}, 500);
	// });
};

const Putter = async () => {
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
	opts.headers = Object.assign(headers, opts.headers)

console.log(opts);
console.log(postBody);
	return new Promise((resolve, reject) => {
		let loginData = '';
		const req = https.request(opts, res => {
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				loginData += chunk;
			});

			res.on('end', () => {
				if (loginData.status==='fail') {
					reject(loginData);
				} else {
					resolve(loginData);
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
