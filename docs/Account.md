# Account

## User Info

Gets some user information, not 100% sure what this is for.

### Request

**GET**

> /api/showctrl/user-info

### Response

#### Success

    {
        "status": "success",
        "data": {
            "thanks": false,
            "invite": false,
            "group": "",
            "survey": false
        }
    }

#### Failure

Unknown / Probably None

## Me

Gets information about rated movie count, leaderboard visibility, account age, and various preferences.

### Request

**GET**

> /api/users/me

### Response

#### Success

    {
        "status": "success",
        "data": {
            "exptInfo": {
                "trailerRecs": {
                    "experimentId": "TagSimilarity"
                },
                "moviesim": {
                    "consented": false,
                    "surveyed": false
                },
                "leaderboard": {
                    "showLeaderboard": true,
                    "isInExpt": true
                }
            },
            "numRatings": 1699,
            "account": {
                "email": "root@example.com",
                "userName": "username",
                "firstLogin": "2018-01-01T00:00:00Z",
                "timeAsMemberSeconds": 100
            },
            "preferences": {
                "canSendEmail": true,
                "hasPickedGroups": true,
                "movieGroupTags": [
                    "dramatic",
                    "good acting",
                    "intense",
                    "classic",
                    "masterpiece",
                    "quotable",
                    "blood",
                    "dark humor",
                    "social commentary"
                ],
                "recommender": {
                    "engineWeight": 0.98375,
                    "popWeight": 0.01625,
                    "engineId": "wizard"
                }
            },
            "state": {
                "userBuddyModel": {
                    "usingBuddyRecommender": false,
                    "buddyIds": []
                }
            }
        }
    }


#### Failure

Unknown / Probably None

## Is Unique Email

Checks to see if user input a unique email address.

### Request

**POST**

> /api/actions/registration/is-unique-email

	{"email":"root@example.com"}

### Response

#### Success

	{"status":"success"}

#### Failure

Unknown / Probably None

## Change Email

Changes your email address.

### Request

**PUT**

> /api/users/me

	{email: "root@example.com"}

### Response

#### Success

	{"status":"success"}

#### Failure

	email address already in use: root@example.com

## Change Password

Changes your password.

### Request

**PUT**

> /api/users/me

	{password: "new_password"}

### Response

#### Success

	{"status":"success"}

#### Failure

Unknown / Probably None

## Delete Account

Delete your account, not documented.

## Email Notificiations

Change your email notification settings.

### Request

**PUT**

> /api/users/me

	{"canSendEmail":true}
    {"canSendEmail":false}

### Response

#### Success

	{"status":"success"}

#### Failure

Unknown / Probably None

## Front Page

Gets data for your customized front page.

https://movielens.org/home

### Request

**GET**

> /api/users/me/frontpage

### Response

#### Success

    {
        "status": "success",
        "data": {
            "listOfSearchResults": [{
                "title": "top picks",
                "description": "MovieLens recommends these movies",
                "url": "/explore/top-picks",
                "searchResults": [**TRUNCATED ARRAY OF MOVIE OBJECTS**],
                "pager": {
                    "itemsPerPage": 24,
                    "totalItems": 57493,
                    "currentPage": 1,
                    "totalPages": 2396
                }
            }, {
                "title": "recent releases",
                "description": "movies released in last 90 days",
                "url": "/explore/recent-releases",
                "searchResults": [**TRUNCATED ARRAY OF MOVIE OBJECTS**],
                "pager": {
                    "itemsPerPage": 24,
                    "totalItems": 223,
                    "currentPage": 1,
                    "totalPages": 10
                }
            }, {
                "title": "rate more",
                "description": "improve your recommendations by rating as many of these movies as you can",
                "url": "/explore?sortBy=popularity&hasRated=no&minYear=2004&maxYear=2007&page=1&heading=rate+more&subHeading=improve+your+recommendations+by+rating+as+many+of+these+movies+as+you+can",
                "searchResults": [**TRUNCATED ARRAY OF MOVIE OBJECTS**],
                "searchResults": [**TRUNCATED ARRAY OF MOVIE OBJECTS**],
                "searchResults": [**TRUNCATED ARRAY OF MOVIE OBJECTS**],
                "pager": {
                    "itemsPerPage": 24,
                    "totalItems": 5227,
                    "currentPage": 1,
                    "totalPages": 218
                }
            }, {
                "title": "favorites from the past year",
                "description": "the highest-rated movies in the past year with at least 100 ratings",
                "url": "/explore/highest-rated-past-year",
                "searchResults": [**TRUNCATED ARRAY OF MOVIE OBJECTS**],
                "pager": {
                    "itemsPerPage": 24,
                    "totalItems": 59187,
                    "currentPage": 1,
                    "totalPages": 2467
                }
            }, {
                "title": "your wishlist",
                "description": null,
                "url": "/explore/your-wishlist",
                "searchResults": [**TRUNCATED ARRAY OF MOVIE OBJECTS**],
                "pager": {
                    "itemsPerPage": 24,
                    "totalItems": 196,
                    "currentPage": 1,
                    "totalPages": 9
                }
            }]
        }
    }

#### Failure

Unknown / Probably None

