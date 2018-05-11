# Expolore

Explore allows you to search movies via various query parameters.

## Query Parameters

### page

Page result number. A query will return a pager object you will have to make subsequent calls to pull all of the data.

**Expects:** `[integer]`

**Default:** `1`

	{ page: 1 }

Example pager object.

	"pager":{"itemsPerPage":24,"totalItems":1174,"currentPage":1,"totalPages":49

### q

Movie title query.

**Expects:** `[string]` (lowercase)

	{ q: 'mad max' }

### directors

Director Name query.

**Expects:** [string] (lowercase)

	{ directors: 'george miller' }

### actors

Actor Name query.

**Expects:** `[string]` (lowercase)

	{ actors: 'tom hardy' }

### maxDaysAgo & maxFutureDays

Maximum days ago movie was released. Maximum days in the future for unreleased movies

**Expects:** [integer]

	{ maxDaysAgo: 90 }
	{ maxFutureDays: 90 }

Can be combined to find new movies, for example find movies released with in the last 5 days.

	{
	    maxDaysAgo:5,
	    maxFutureDays: 0
	}

### hasRated

Include or do not include movies you've rated.

**Expects:** `[yes|no|ignore]`

**Default:** `no`

Include only movies you've rated.

	{ hasRated: 'yes' }

Include only movies you have not rated.

	{ hasRated: 'no' }

Include both movies you've rated and not.

	{ hasRated: 'ignore' }

### sortBy

Data sort type.

**Expects:** `[userRatedDate|userRating|userRatingDiff|prediction|popularity|releaseDate|dateAdded|tagScore]`

**Default:** *unknown*

**userRatedDate** - Date you rated the movie.

	{ sortBy: 'userRatedDate'}

**userRating** - Your rating.

	{ sortBy: 'userRating'}

**userRatingDiff** - User rating difference. This returns movies which you rated much differently than the average.

	{ sortBy: 'userRatingDiff'}

**prediction** - Sort by the system's prediction on whether you're going to like the movie or not.

	{ sortBy: 'prediction'}

**popularity** - Sort by movie popularity.

	{ sortBy: 'popularity'}

**releaseDate** - Sort by release date of movies.

	{ sortBy: 'releaseDate'}

**dateAdded** - Sort by date added to movielens.

	{ sortBy: 'dateAdded'}

**tagScore** - Sort by tag scores.

	{ sortBy: 'tagScore'}

### sortDirection

Direction of sorted results.

**Expects:** `[asc|desc]`

**Default:** `desc`

    { sortDirection: 'asc' }
    { sortDirection: 'desc' }

### genre

Genre of the movies you want to find.

**Expects:** `[string]` (lowercase)

Use the getGenres() method to get the current list.

	{ genre: 'mystery' }
	{ genre: 'science fiction' }

### tag

Movies tags.

**Expects:** `[string]` (lowercase) || `[array of strings]` (lowercase)

A single tag will return all movies with that tag, where as a comma delineated list will return movies with any of the tags listed.

All movies tagged zombie.

	{ tag: 'zombie' }

Both movies tagged zombie OR funny. This is kind of odd, I'd expect it to return funny zombie movies, but it does not.

	{ tag: ['zombie','funny'] }

### languages

Language of the movie or more specifically if the movie has been translated into one of the languages. Despite the name you may only pass one language.

**Expects:** `[string]` (lowercase)

**Default:** `[empty]`

	{ languages: 'english' }
	{ languages: 'ქართული' }

List of languages I've found, there may be more.

| Language   | string           |
|:-----------|-----------------:|
| Afrikaans  | afrikaans        |
| Albanian   | shqip            |
| Arabic     | العربية            |
| Bambara    | bamanankan       |
| Bengali    | বাংলা             |
| Bosnian    | босански         |
| Bulgarian  | български език   |
| Catalan    | català           |
| Croatian   | hrvatski         |
| Czech      | český            |
| Danish     | dansk            |
| Dutch      | nederlands       |
| English    | english          |
| Estonian   | eesti            |
| Finnish    | suomi            |
| French     | français         |
| Galician   | galego           |
| Georgian   | ქართული          |
| German     | deutsch          |
| Greek      | ελληνικά         |
| Hebrew     | עִבְרִית            |
| Hindi      | हिन्दी              |
| Hungarian  | magyar           |
| Icelandic  | íslenska         |
| Indonesian | bahasa indonesia |
| Irish      | gaeilge          |
| Italian    | italiano         |
| Japanese   | 日本語            |
| Latin      | latin            |
| Mandarin   | 普通话            |
| Norwegian  | norsk            |
| Pashto     | پښتو              |
| Polish     | polski           |
| Portuguese | português        |
| Punjabi    | ਪੰਜਾਬੀ        |
| Romanian   | română           |
| Russian    | pусский          |
| Slovak     | slovenčina       |
| Spanish    | español          |
| Swahili    | kiswahili        |
| Swedish    | svenska          |
| Tamil      | தமிழ்         |
| Telugu     | తెలుగు         |
| Thai       | ภาษาไทย          |
| Turkish    | türkçe           |
| Ukrainian  | український      |
| Urdu       | اردو             |
| Vietnamese | tiếng%20việt     |
| Welsh      | cymraeg          |
| Wolof      | wolof            |

### mpaa

MPAA rating.

**Expects:** `[string]` (lowercase) || `[array of strings]` (lowercase)

**Default:** `[empty]`

{ mpaa: 'g' }
{ mpaa: ['g','pg'] }

Valid options.

| string   | rating                      |
|:---------|----------------------------:|
| g        | General Audiences           |
| pg       | Parental Guidance Suggested |
| pg-13    | Parents Strongly Cautioned  |
| r        | Restricted                  |
| nc-17    | Adults Only                 |

### minPop & maxPop

Minimum and Maximum number of ratings.

**Expects:** `[integer]`

**Default:** `[empty]`

    { minPop:0 }
    { maxPop:5000 }
    { minPop:0, maxPop:5000 }

Each movie has a Number of Ratings attribute. These are used to narrow the number of ratings down or search for not often rated movies.

    "numRatings": 15251,

### minYear & maxYear

Minimum and Maximum years. Good for finding movies between a date range or released on a specific year.

**Expects:** `[integer]`

**Default:** `[empty]`

    { minYear:0 }
    { maxYear:2015 }
    { minYear:1980, maxYear:1989 }

### hasHidden

Include movies you have hidden.

**Expects:** `[yes|no|ignore]`

**Default:** `no`

Show only movies you've hidden.

    { hasHidden:'yes' }

Show only movies you have not hidden.

    { hasHidden:'no' }

Show all movies hidden or not.

    { hasHidden:'ignore' }

### hasWishlisted

Include movies on your wishlist.

**Expects:** `[yes|no|ignore]`

**Default:** `no`

Show only movies on your wishlist.

    { hasWishlisted:'yes' }

Show only movies not on your wishlist.

    { hasWishlisted:'no' }

Show all movies wishlested or not.

    { hasWishlisted:'ignore' }




## Get Genres

Gets a list of genres with tags and counts.

https://movielens.org/genres

### Request

**GET**

> /api/movies/genres

### Response

#### Success

    {
        "status": "success",
        "data": {
            "popularTagsForGenres": {
                "Foreign": ["Bollywood", "India", "cricket", "aamir khan", "long"],
                "Action": ["sci-fi", "superhero", "dystopia", "visually appealing", "space"],
                "Adventure": ["sci-fi", "action", "fantasy", "space", "visually appealing"],
                "Horror": ["zombies", "atmospheric", "disturbing", "post-apocalyptic", "vampires"],
                "Romance": ["quirky", "surreal", "bittersweet", "comedy", "visually appealing"],
                "War": ["World War II", "historical", "history", "true story", "atmospheric"],
                "History": ["World War II", "based on a true story", "war", "politics", "inspirational"],
                "Science Fiction": ["dystopia", "space", "time travel", "aliens", "action"],
                "Western": ["Quentin Tarantino", "spaghetti western", "Clint Eastwood", "visually appealing", "Leonardo DiCaprio"],
                "Documentary": ["politics", "nature", "musicians", "music", "Criterion"],
                "Drama": ["atmospheric", "surreal", "twist ending", "psychology", "thought-provoking"],
                "Thriller": ["twist ending", "sci-fi", "action", "atmospheric", "dystopia"],
                "Music": ["musical", "musicians", "rock and roll", "Disney", "great soundtrack"],
                "Crime": ["dark comedy", "twist ending", "atmospheric", "violence", "Quentin Tarantino"],
                "Fantasy": ["surreal", "based on a book", "magic", "superhero", "visually appealing"],
                "Animation": ["anime", "Disney", "Pixar", "Studio Ghibli", "funny"],
                "Family": ["animation", "Disney", "fantasy", "Pixar", "funny"],
                "Comedy": ["dark comedy", "quirky", "satire", "black comedy", "surreal"],
                "Mystery": ["twist ending", "atmospheric", "sci-fi", "surreal", "psychological"],
                "TV movie": ["Christmas", "musical", "stand-up comedy", "based on a book", "based on a true story"]
            },
            "numMoviesPerGenre": {
                "Foreign": 66,
                "Action": 8094,
                "Adventure": 4357,
                "Horror": 5868,
                "Romance": 8153,
                "War": 1692,
                "History": 1714,
                "Science Fiction": 3585,
                "Western": 1514,
                "Documentary": 4897,
                "Drama": 25143,
                "Thriller": 9227,
                "Music": 2151,
                "Crime": 5425,
                "Fantasy": 2777,
                "Animation": 2553,
                "Family": 3354,
                "Comedy": 16609,
                "Mystery": 3054,
                "TV movie": 1139
            }
        }
    }

#### Failure

Unknown / Probably None


## Top Pics for You

https://movielens.org/explore/top-picks

> /api/explore/top-picks

## Recent Releases

https://movielens.org/explore/recent-releases

> /api/explore/recent-releases

## Highest Rated Past Year

https://movielens.org/explore/highest-rated-past-year

> /explore/highest-rated-past-year

## Top Pics for You

https://movielens.org/explore/top-picks

> /api/movies/explore?hasRated=no&sortBy=prediction

## Recent Releases

https://movielens.org/explore/recent-releases

> /api/movies/explore?hasRated=no&maxDaysAgo=90&maxFutureDays=0&sortBy=releaseDate

## Recent Favorites

https://movielens.org/explore/highest-rated-past-year

> /api/movies/explore?hasRated=no&maxDaysAgo=365&maxFutureDays=0&minPop=100&sortBy=avgRating

## New Additions

https://movielens.org/explore/recently-added

> /api/movies/explore?sortBy=dateAdded

## Movies You've Rated

https://movielens.org/explore/your-ratings

> /api/movies/explore?hasRated=yes&sortBy=userRatedDate

## Your Wishlist

https://movielens.org/explore/your-wishlist

> /explore/your-wishlist


## Hidden Movies

https://movielens.org/explore/your-hidden-movies

> /api/movies/explore?hasHidden=yes

## Top Action Movies for You

https://movielens.org/explore/genres/action

> /api/movies/explore?genre=action&hasRated=no&heading=action&sortBy=prediction&subHeading=browsing+by+genre

