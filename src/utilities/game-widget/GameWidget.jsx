import React from 'react';
import ICON from '../../constants/Constants.js';

import '../game-widget/GameWidget.scss';

const GameWidget = (props) => {
    const data = props.data;
    return (
        <div className="game-widget">
            <header id="GAME-WIDGET-STATIC" className="image">
                <img src={data.background_image} alt="Error" />
                <div className="text">
                    <h1 className="title">{data.name}</h1>
                    <ul>{ICON.GET_STORES(data.platforms)}</ul>
                </div>
            </header>
            {/* <header id="GAME-WIDGET-MOVING" className="image">
                replacement
            </header> */}
            <div className="details">
                <div class="form-group">
                    <label>Release Date</label>
                    <span>{data.released}</span>
                </div>
                <div class="form-group">
                    <label>Genre</label>
                    <span>{data.genres.map(obj => obj.name).join(', ')}</span>
                </div>
                <div class="form-group">
                    <label>Metacritic</label>
                    <span>{data.metacritic}</span>
                </div>
                <div class="form-group">
                    <label>Rating</label>
                    <span>{data.rating}</span>
                </div>
            </div>
            <footer>
                <button>View More</button>
            </footer>
        </div>
    )
}

export default GameWidget
