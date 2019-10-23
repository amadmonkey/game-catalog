const express = require('express');
const request = require('request');

const app = express();

const keys = {
    gamespot: '1f099cba5cd8bb63f9a598f5e5139500f074595c'
}

const parseRequest = (obj) => {
    return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/articles', (req, res) => {
    req.query.format = 'json';
    req.query.api_key = keys.gamespot;
    request(
        { url: `https://www.gamespot.com/api/articles?${parseRequest(req.query)}` },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }
            res.json(JSON.parse(body));
        }
    )
});

app.get('/games', (req, res) => {
    request(
        { url: `https://api.rawg.io/api/games?${parseRequest(req.query)}` },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }
            res.json(JSON.parse(body));
        }
    )
});
app.get('/reviews', (req, res) => {
    req.query.format = 'json';
    req.query.api_key = keys.gamespot;
    request(
        { url: `https://www.gamespot.com/api/reviews?${parseRequest(req.query)}` },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }
            res.json(JSON.parse(body));
        }
    )
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));