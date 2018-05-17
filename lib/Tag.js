const REST     = require('./REST.js');

const AddTag = async (cookie, movieId='', tag='') => {
    const path = '/api/users/me/tags';

    const postBody = {
        movieId: movieId,
        tag: tag
    };

    const headers = {
        Cookie: cookie
    };

    const response = await REST.Poster(path, {}, postBody, headers);
    return new Promise(resolve => {
        resolve(response);
    });
};

const YourTags = async () => {
    //
};

module.exports =  { AddTag, YourTags };
