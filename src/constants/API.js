import axios from 'axios';

const base = 'https://portfolio-game-catalog.herokuapp.com';

const getArticles = (params) => {
    return axios.get(base + '/articles', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getGamesMain = (params) => {
    return axios.get(base + '/games-main', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getGames = (params) => {
    return axios.get(base + '/games', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getGamesDetails = (params) => {
    return axios.get(base + '/games-details', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getGame = (params) => {
    return axios.get(base + '/game', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getGameScreenshots = (params) => {
    return axios.get(base + '/screenshots', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getGameMovies = (params) => {
    return axios.get(base + '/movies', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getGameSimilarGames = (params) => {
    return axios.get(base + '/similar_games', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getReviews = (params) => {
    return axios.get(base + '/reviews', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getPlatforms = (params) => {
    return axios.get(base + '/platforms', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getPlatformsDetails = (params) => {
    return axios.get(base + '/platforms-details', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getGenres = (params) => {
    return axios.get(base + '/genres', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getPublishers = (params) => {
    return axios.get(base + '/publishers', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const API = {
    GET: {
        ARTICLES: getArticles,
        GAMES_MAIN: getGamesMain,
        GAMES: getGames,
        GAME_DETAILS: getGamesDetails,
        GAME: getGame,
        GAME_SCREENSHOTS: getGameScreenshots,
        GAME_MOVIES: getGameMovies,
        GAME_SIMILAR_GAMES: getGameSimilarGames,
        REVIEWS: getReviews,
        PLATFORMS: getPlatforms,
        PLATFORMS_DETAILS: getPlatformsDetails,
        GENRES: getGenres,
        PUBLISHERS: getPublishers
    }
}

export default API;