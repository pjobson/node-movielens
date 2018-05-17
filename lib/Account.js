const REST     = require('./REST.js');

const UserInfo = async (cookie={}) => {
	// GET
	// /api/showctrl/user-info
	const path = '/api/showctrl/user-info';
	const response = await REST.Getter(path, {}, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

const Me = async () => {
	// GET
	// /api/users/me
	const path = '/api/users/me';
	const response = await REST.Getter(path, {}, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

const IsUniqueEmail = async () => {
	// POST
	// /api/actions/registration/is-unique-email
	// {"email":"root@example.com"}
};

const ChangeEmail = async () => {
	// PUT
	// /api/users/me
	// {email: "root@example.com"}
};

const ChangePassword = async () => {
	// PUT
	// /api/users/me
	// {password: "new_password"}
};

const DeleteAccount = async () => {
	// NOT IMPLEMENTED
};

const EmailNotifications = async () => {
	// PUT
	// /api/users/me
	// {"canSendEmail":true}
	// {"canSendEmail":false}
};

const FrontPage = async () => {
	// GET
	// /api/users/me/frontpage
	const path = '/api/users/me/frontpage';
	const response = await REST.Getter(path, {}, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};


module.exports =  { UserInfo, Me, FrontPage };
