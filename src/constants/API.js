import axios from 'axios';

const getArticles = (params) => {
    return axios.get('http://localhost:3001/articles', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}

const getGames = (params) => {
    return axios.get('http://localhost:3001/games', {
        params: params
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    })
}


const getReviews = (params) => {
    return axios.get('http://localhost:3001/reviews', {
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