# node-movielens

*This is currently in a very broken state, I have not had the time or interest in updating it.*

Node API for the movielens unpublished API

This currently supports read methods, there are some write methods, but I'm too lazy to implement them right now.

This came about, because I wanted to export the list of movies I've rated to share with friends and there was no published way to do it.

## Usage

    var ml = require('node-movielens');

## Methods

### login()

Tries to log you into your account.

    ml.login({
        'username': 'your@email_address.com',
        'password': 'your_password'
    }, function(msg) {
        if (msg.status==='success') {
            // successful
            console.log('successful');
        } else {
            console.log(msg);
        }
    });

Login returns success messages or failures.

Successful message.

    { status: 'success' }

Most common failure due to invalid password, other errors may include missing username or password issues.

    { status: 'fail', message: 'authentication failed' }

Request failure due to other issues can return an error which looks like this, for this example I modified the host name so it would specifically fail.  Other similar errors may appear from timeouts or whatnot.

    { code: 'ENOTFOUND',
      errno: 'ENOTFOUND',
      syscall: 'getaddrinfo',
      hostname: 'movielensx.org',
      status: 'fail' }

### getAuthCookie()

Gets the authentication cookie, do this after you login.  Useful so you don't have to login again and again.  You can store this locally somewhere.

At the time this was written the cookie expires after a year.

    ml.getAuthCookie(function(cookie) {
        console.log(cookie);
    });

### setAuthCookie()

Using the cookie from getAuthCookie you can set the cookie instead of logging in again and again.

Returns success or expired depending on the status of your cookie.  It just compares the expire date of your cookie to the current time.

    var cookie = 'cookie_data_here';
    ml.setAuthCookie(cookie,function(message) {
        console.log(message);
    });

### getGenres()

Gets the list of move genres and the top(?) tags in those genres.

    ml.getGenres(function(genres) {
        console.log(genres);
    });

### getMe()

Gets your user information such as: Number of Ratings, Email, User Name, Preferences, and Recommender Type.

    ml.getMe(function(me) {
        console.log(me);
    });

### getMyTags()

Gets the tags you have made.

    ml.getMyTags(function(tags) {
        console.log(tags);
    });

### explore()

The best for last, explore is the query engine to search for movies.

Examples

    // Get 'mad max' movies
    // 4 results found
    ml.explore({
        q: 'mad max'
    }, function(res) {
        console.log(res);
    });

    // Get 'mad max' movies directed by 'georege miller'
    // 4 results found
    ml.explore({
        q: 'mad max',
        directors: 'george miller'
    }, function(res) {
        console.log(res);
    });

    // Get 'mad max' movies directed by 'george miller' acted by 'tom hardy'
    // 1 result found
    ml.explore({
        q: 'mad max',
        directors: 'george miller',
        actors: 'tom hardy'
    }, function(res) {
        console.log(res);
    });

    // Get movies acted by 'tom hardy' which I've rated
    // 6 results found
    ml.explore({
        actors: 'tom hardy',
        hasRated: 'yes'
    }, function(res) {
        console.log(res);
    });

    // Get movies directed by 'george miller' in the 80's ordered by popularity (number of ratings)
    // 4 results found
    // "title": "Mad Max 2: The Road Warrior",
    // "numRatings": 9783,
    // "avgRating": 3.62818
    //
    // "title": "Mad Max Beyond Thunderdome",
    // "numRatings": 6046,
    // "avgRating": 3.11346
    //
    // "title": "The Witches of Eastwick",
    // "numRatings": 1997,
    // "avgRating": 3.1993
    //
    // "title": "Twilight Zone: The Movie",
    // "numRatings": 454,
    // "avgRating": 3.25441
    ml.explore({
        directors: 'george miller',
        minYear: 1980,
        maxYear: 1989,
        sortBy: 'popularity'
    }, function(res) {
        console.log(res);
    });

Here is a description of the API from what I've been able to find, there may be more options which I do not know of.

#### page

Page result number.  A query will return a pager object you will have to make subsequent calls to pull all of the data.

Expects: integer

Default: 1

    {
        page: 1
    }

Example pager object.

    "pager":{"itemsPerPage":24,"totalItems":1174,"currentPage":1,"totalPages":49

#### q

Movie title query.

Expects: lower case string

    {
        q: 'mad max'
    }

#### directors

Director Name query.

Expects: lower case string

    {
        directors: 'george miller'
    }

#### actors

Actor Name query.

Expects: lower case string

    {
        actors: 'tom hardy'
    }

#### maxDaysAgo & maxFutureDays

Maximum days ago movie was released.  Maximum days in the future for unreleased movies

Expects: integer

    {
        maxDaysAgo: 90
    }
    {
        maxFutureDays: 90
    }

Can be combined to find new movies, for example find movies released with in the last 5 days.

    {
        maxDaysAgo:5,
        maxFutureDays: 0
    }

#### hasRated

Include or do not include movies you've rated.

Expects: yes, no, ignore

Default: no

Include only movies you've rated.

    {
        hasRated: 'yes'
    }

Include only movies you have not rated.

    {
        hasRated: 'no'
    }

Include both movies you've rated and not.

    {
        hasRated: 'ignore'
    }

#### sortBy

Data sort type.

Expects: userRatedDate, userRating, userRatingDiff, prediction, popularity, releaseDate, dateAdded, tagScore

Default: (I'm not sure)

    {
        sortBy: 'userRatedDate'
    }
    {
        sortBy: 'userRating'
    }

##### userRatedDate

Date you rated the movie.

##### userRating

Your rating.

##### userRatingDiff

User rating difference.  This returns movies which you rated much differently than the average.

For eample I rated Where The Buffalo Roam at 5.0 where as the average rating was 3.12526.

    {
        "movieId": 3235,
        "movie": {
            ....stuff removed....
            "title": "Where the Buffalo Roam",
            ....stuff removed....
            "numRatings": 475,
            "avgRating": 3.12526
        },
        "movieUserData": {
            "userId": 207419,
            "movieId": 3235,
            "rating": 5.0,
            "prediction": 4.192776855666071,
            "wishlist": false
        }
    }

##### prediction

Sort by the system's prediction on whether you're going to like the movie or not.

##### popularity

Sort by movie popularity.

##### releaseDate

Sort by release date of movies.

##### dateAdded

Sort by date added to movielens.

##### tagScore

Sort by tag scores.

#### sortDirection

Direction of sorted results.

Expects: asc, desc

Default: desc

    {
        sortDirection: 'asc'
    }
    {
        sortDirection: 'desc'
    }

#### genre

Genre of the movies you want to find.

Expects: lower case string

Use the getGenres() method to get the current list.

    {
        genre: 'mystery'
    }
    {
        genre: 'science fiction'
    }

#### tag

Movies tags.

Expects: a string or an array of strings, lower case list of tags

A single tag will return all movies with that tag, where as a comma delineated list will return movies with any of the tags listed.

All movies tagged zombie.

    {
        tag: 'zombie'
    }

Both movies tagged zombie OR funny.  This is kind of odd, I'd expect it to return funny zombie movies, but it does not.

    {
        tag: ['zombie','funny']
    }

#### languages

Language of the movie or more specifically if the movie has been translated into one of the languages.  Despite the name you may only pass one language.

Expects: lower case string

Default: (empty any language)

    {
        languages: 'english'
    }
    {
        languages: 'ქართული'
    }

List of languages I've found, there may be more.

    Afrikaans      afrikaans
    Albanian       shqip
    Arabic         العربية
    Bambara        bamanankan
    Bengali        বাংলা
    Bosnian        босански
    Bulgarian      български език
    Catalan        català
    Croatian       hrvatski
    Czech          český
    Danish         dansk
    Dutch          nederlands
    English        english
    Estonian       eesti
    Finnish        suomi
    French         français
    Galician       galego
    Georgian       ქართული
    German         deutsch
    Greek          ελληνικά
    Hebrew         עִבְרִית
    Hindi          हिन्दी
    Hungarian      magyar
    Icelandic      íslenska
    Indonesian     bahasa indonesia
    Irish          gaeilge
    Italian        italiano
    Japanese       日本語
    Latin          latin
    Mandarin       普通话
    Norwegian      norsk
    Pashto         پښتو
    Polish         polski
    Portuguese     português
    Punjabi        ਪੰਜਾਬੀ
    Romanian       română
    Russian        pусский
    Slovak         slovenčina
    Spanish        español
    Swahili        kiswahili
    Swedish        svenska
    Tamil          தமிழ்
    Telugu         తెలుగు
    Thai           ภาษาไทย
    Turkish        türkçe
    Ukrainian      український
    Urdu           اردو
    Vietnamese     tiếng%20việt
    Welsh          cymraeg
    Wolof          wolof

#### mpaa

MPAA rating.

Expects: a string or array of strings  of ratings

Default: (none show all movies of any rating)

    {
        mpaa: 'g'
    }
    {
        mpaa: ['g','pg']
    }

Valid options.

    g       General Audiences
    pg      Parental Guidance Suggested
    pg-13   Parents Strongly Cautioned
    r       Restricted
    nc-17   Adults Only

#### minPop & maxPop

Minimum and Maximum number of ratings.

Expects: integer

Default: (none)

    {
        minPop:0
    }
    {
        maxPop:5000
    }
    {
        minPop:0,
        maxPop:5000
    }

Each movie has a Number of Ratings attribute.  These are used to narrow the number of ratings down or search for not often rated movies.

    "numRatings": 15251,

#### minYear & maxYear

Minimum and Maximum years.  Good for finding movies between a date range or released on a specific year.

Expects: integer

Default: (none)

    {
        minYear:0
    }
    {
        maxYear:2015
    }
    {
        minYear:1980,
        maxYear:1989
    }

#### hasHidden

Include movies you have hidden.

Expects: yes, no, ignore

Default: no

Show only movies you've hidden.

    {
        hasHidden:'yes'
    }

Show only movies you have not hidden.

    {
        hasHidden:'no'
    }
Show all movies hidden or not.

    {
        hasHidden:'ignore'
    }

#### hasWishlisted

Include movies on your wishlist.

Expects: yes, no, ignore

Default: no

Show only movies on your wishlist.

    {
        hasWishlisted:'yes'
    }

Show only movies not on your wishlist.

    {
        hasWishlisted:'no'
    }

Show all movies wishlested or not.

    {
        hasWishlisted:'ignore'
    }

### Various explore() Shortcut Methods

#### topPicks()

Your top picks.

    {
        hasRated: 'no',
        sortBy: 'prediction'
    }

#### recentReleases()

Recently released movies.

    {
        hasRated: 'no',
        maxDaysAgo: 90,
        maxFutureDays: 0,
        sortBy: 'releaseDate'
    }

#### favoritesYear()

Favorites within the last year.

    {
        hasRated: 'no',
        maxDaysAgo: 365,
        maxFutureDays: 0,
        minPop: 100,
        sortBy: 'avgRating'
    }

#### newAdditions()

The movies most recently added to MovieLens.

    {
        sortBy: 'dateAdded'
    }

#### yourRatings()

Movies which you've rated.

    {
        hasRated: 'yes',
        sortBy: 'userRatedDate'
    }

#### yourWishlist()

Movies in your wishlist.

    {
        hasWishlisted: 'yes',
        sortBy: 'userListedDate'
    }

#### yourHidden()

Movies you've hidden.

    {
        hasHidden: 'yes'
    }

