# Tags

## Your Tags

https://movielens.org/profile/tags

> /api/users/me/tags

## Add Tag

Add a tag to a movie.

### Request

**POST**

> /api/users/me/tags

	{"movieId":00000,"tag":"tag"}

### Response

#### Success

    {
        "status": "success",
        "data": {
            "tagApplication": {
                "tagEventId": null,
                "userId": 0000000,
                "movieId": 000000,
                "tag": "nazis",
                "affect": 0,
                "tStamp": null,
                "movie": null
            }
        }
    }

#### Failure

Unknown
