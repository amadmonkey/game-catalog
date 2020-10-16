// app
import React from 'react';
import { Link, useHistory } from "react-router-dom";

// data
import ICON from '../../constants/Constants.js';

// styles
import '../game-widget/GameWidget.scss';

const GameWidget = (props) => {

    const data = props.data;
    const history = useHistory();
    return (
        <div className="game-widget">
            <header id="GAME-WIDGET-STATIC" className="image">
                <img loading="lazy" src={data.background_image} alt="Error" />
                <div className="text">
                    <Link to={`/games/${data.name}/${data.id}`}><h1 className="title">{data.name}</h1></Link>
                    <ul>{ICON.GET_PLATFORMS(data.parent_platforms)}</ul>
                </div>
            </header>
            <div className="details">
                <div className="form-group">
                    <label>Release Date</label>
                    <span>{data.released}</span>
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <span>{data.genres.map(obj => obj.name).join(', ')}</span>
                </div>
                <div className="form-group">
                    <label>Metacritic</label>
                    <span>{data.metacritic}</span>
                </div>
                <div className="form-group">
                    <label>Rating</label>
                    <span>{data.rating}</span>
                </div>
            </div>
            <footer>
                <button onClick={(e) => { history.push(`/games/${data.name}/${data.id}`) }}>View More</button>
            </footer>
        </div>
    )

}

export default GameWidget
