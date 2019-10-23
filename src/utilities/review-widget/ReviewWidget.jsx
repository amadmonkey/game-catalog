import React from 'react';
import RatingMeter from '../rating-meter/RatingMeter';
import ICON from '../../constants/Constants.js';

import './ReviewWidget.scss';

const ReviewWidget = (props) => {
    const data = props.data;
    let containerId = props.container.toUpperCase().replace(/ /g, '-');

    return (
        <div className="review-widget">
            <div className="image">
                <img src={data.image.original} alt="Error" />
                <div className="text">
                    {data.game && <h1 className="title">{data.game.name}</h1>}
                    {data.movie && <h1 className="title">{data.movie.name}</h1>}
                    <ul>{ICON.GET_STORES(data.releases)}</ul>
                </div>
            </div>
            <div className="details">
                <p className="deck">
                    "{data.deck}"
                </p>
                {data.authors && <span className="author">- {data.authors}</span>}
                <RatingMeter id={data.id + '-' + containerId} rate={data.score} />
            </div>
        </div>
    )
}

export default ReviewWidget
