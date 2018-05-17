# Sessions

## Login

Login to system.

### Request

**POST**

> /api/sessions

	{"userName":"root@example.com","password":"abc123"}
	
Note the `N` in `userName`, if you send `username` the request will fail.

### Response

#### Failure

	{"status":"fail","message":"authentication failed"}

#### Success

	{"status":"success"}

## Logout

Logout of system.

### Request

**DELETE**

> /api/sessions/me

### Response

#### Success

	{"status":"success","message":"logged out"}

#### Failure

Unknown / Probably None
