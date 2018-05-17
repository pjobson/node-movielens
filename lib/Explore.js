const REST     = require('./REST.js');

const GetGenres = async (cookie={}) => {
	// GET
	// /api/movies/genres
	const path = '/api/movies/genres';
	const response = await REST.Getter(path, {}, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

const TopPicsForYou = async (cookie={}, genre) => {
	// GET
	// /api/explore/top-picks
	// /api/movies/explore?genre=action&hasRated=no&heading=action&sortBy=prediction&subHeading=browsing+by+genre
	const path = (!genre) ? '/api/explore/top-picks' : '/api/movies/explore';
	const queryParams = (!genre) ? {} : {
		genre      : genre,
		hasRated   : 'no',
		heading    : genre,
		sortBy     : 'prediction',
		subHeading : 'browsing+by+genre'
	};
	const response = await REST.Getter(path, queryParams, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

const RecentReleases = async (cookie={}) => {
	// GET
	// /api/explore/recent-releases
	const path = '/api/explore/recent-releases';
	const response = await REST.Getter(path, {}, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

const HighestRatedPastYear = async (cookie={}) => {
	// GET
	// /explore/highest-rated-past-year
	const path = '/explore/highest-rated-past-year';
	const response = await REST.Getter(path, {}, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

const RecentFavorites = async (cookie={}) => {
	// GET
	// /api/movies/explore?hasRated=no&maxDaysAgo=365&maxFutureDays=0&minPop=100&sortBy=avgRating
	const path = '/api/movies/explore';
	const queryParams = {
		hasRated      : 'no',
		maxDaysAgo    : '365',
		maxFutureDays : '0',
		minPop        : '100',
		sortBy        : 'avgRating'
	};
	const response = await REST.Getter(path, queryParams, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

const NewAdditions = async (cookie={}) => {
	// GET
	// /api/movies/explore?sortBy=dateAdded
	const path = '/api/explore';
	const queryParams = {
		sortBy: 'dateAdded'
	};
	const response = await REST.Getter(path, queryParams, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

const MoviesYouveRated = async (cookie={}) => {
	// GET
	// /api/movies/explore?hasRated=yes&sortBy=userRatedDate
	const path = '/api/explore';
	const queryParams = {
		hasRated : 'yes',
		sortBy   : 'userRatedDate'
	};
	const response = await REST.Getter(path, queryParams, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

const YourWishlist = async (cookie={}) => {
	// GET
	// /explore/your-wishlist
	const path = '/explore/your-wishlist';
	const response = await REST.Getter(path, {}, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

const HiddenMovies = async (cookie={}) => {
	// GET
	// /api/movies/explore?hasHidden=yes
	const path = '/api/explore';
	const queryParams = {
		hasHidden: 'yes'
	};
	const response = await REST.Getter(path, queryParams, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

const UnratedLowRatingCount = async (cookie={}, genre, page) => {
	// GET
	// Genre: /api/movies/explore?genre=western&hasRated=ignore&sortBy=popularity&sortDirection=asc
	// All: /api/movies/explore?hasRated=ignore&sortBy=popularity&sortDirection=asc
	const path = '/api/movies/explore';
	const queryParams = {
		genre         : genre,
		page          : page,
		hasRated      : 'ignore',
		sortBy        : 'popularity',
		sortDirection : 'asc'
	};
	if (!genre) delete queryParams.genre;
	const response = await REST.Getter(path, queryParams, cookie);
	return new Promise(resolve => {
		resolve(response);
	});
};

module.exports = { GetGenres, TopPicsForYou, RecentReleases, HighestRatedPastYear, RecentFavorites, NewAdditions, MoviesYouveRated, YourWishlist, HiddenMovies, UnratedLowRatingCount };
