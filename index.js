const Account  = require('./lib/Account.js');
const Actions  = require('./lib/Actions.js');
const Explore = require('./lib/Explore.js');
const Sessions = require('./lib/Sessions.js');
const Tag      = require('./lib/Tag.js');

class MovieLens {
	constructor(auth=false) {
		const $ML = this;

		if (auth) $ML.setAuth(auth);
	};

	async userInfo() {
		const UserInfo = await Account.UserInfo(this.cookie);
		return UserInfo;
	};
	/*
	 * Logs user in
	 * @constructor
	 */
	async login() {
		const SessionLogin = await Sessions.Login(this.auth);
		return SessionLogin;
	};
	/*
	 * Logs user out
	 * @constructor
	 */
	async logout() {
		const SessionLogout = await Sessions.Logout();
		return SessionLogout;
	};
	/*
	 * Sets user authenticaion
	 * @constructor
	 * @augments auth
	 */
	setAuth(auth) {
		if (Object.keys(auth).length === 2) {
			this.auth = auth;
			return true;
		}
		return false;
	};
	/*
	 * Sets user cookie
	 * @constructor
	 * @augments auth
	 */
	setCookie(cookie) {
		this.cookie = cookie;
		return true;
	};


	async logout() {
		const SessionLogout = await Sessions.Logout();
		return SessionLogout;
	}


	async getGenres() {
		const ExploreGetGenres = await Explore.GetGenres(this.cookie);
		return ExploreGetGenres;
	};
	async topPicsForYou(genre=false) {
		const ExploreTopPicsForYou = await Explore.TopPicsForYou(this.cookie, genre);
		return ExploreTopPicsForYou;
	};
	async recentReleases() {
		const ExploreRecentReleases = await Explore.RecentReleases(this.cookie);
		return ExploreRecentReleases;
	};
	async highestRatedPastYear() {
		const ExploreHighestRatedPastYear = await Explore.HighestRatedPastYear(this.cookie);
		return ExploreHighestRatedPastYear;
	};
	async recentFavorites() {
		const ExploreRecentFavorites = await Explore.RecentFavorites(this.cookie);
		return ExploreRecentFavorites;
	};
	async newAdditions() {
		const ExploreNewAdditions = await Explore.NewAdditions(this.cookie);
		return ExploreNewAdditions;
	};
	async moviesYouveRated() {
		const ExploreMoviesYouveRated = await Explore.MoviesYouveRated(this.cookie);
		return ExploreMoviesYouveRated;
	};
	async yourWishlist() {
		const ExploreYourWishlist = await Explore.YourWishlist(this.cookie);
		return ExploreYourWishlist;
	};
	async hiddenMovies() {
		const ExploreHiddenMovies = await Explore.HiddenMovies(this.cookie);
		return ExploreHiddenMovies;
	};
	async unratedLowRatingCount(genre=false, page=1) {
		const ExploreUnratedLowRatingCount = await Explore.UnratedLowRatingCount(this.cookie, genre, page);
		return ExploreUnratedLowRatingCount;
	};

	async addTag(movieId, tag) {
		const TagAddTag = await Tag.AddTag(this.cookie, movieId, tag);
		return TagAddTag;
	}

};


module.exports = MovieLens;
