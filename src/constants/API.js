import axios from 'axios';

const base = 'https://shrouded-atoll-96049';

const getArticles = (params) => {
    return axios.get(base + '/articles', {
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


const getReviews = (params) => {
    return axios.get(base + '/reviews', {
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
        GAMES: getGames,
        REVIEWS: getReviews
    }
}

export default API;