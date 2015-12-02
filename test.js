#!/bin/env node


var username = 'username@gmail.com';
var password = 'xxx';


var ml = require('./index.js');
ml.init({
	'userName': username,
	'password': password
});


