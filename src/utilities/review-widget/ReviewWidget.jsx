// app
import React from 'react';

// components
import RatingMeter from '../rating-meter/RatingMeter';
import { ModalContext } from "../../utilities/modal/ModalContext";

// data
import ICON from '../../constants/Constants.js';

// styles
import './ReviewWidget.scss';

const ReviewWidget = (props) => {
    const data = props.data;
    let { handleModal } = React.useContext(ModalContext);
    return (
        <div className="review-widget">
            <div className="image">
                <img loading="lazy" src={data.image.square_small} alt="Error" />
                <div className="text">
                    {data.game && <h1 className="title" onClick={() => handleModal(data)}>{data.game.name}</h1>}
                    {!data.game && <h1 className="title" onClick={() => handleModal(data)}>{data.title}</h1>}
                    {data.game && <ul>{ICON.GET_STORES(data.stores)}</ul>}
                </div>
            </div>
            <div className="details">
                <p className="deck">
                    "{data.deck}"
                </p>
                {data.authors && <span className="author">- {data.authors}</span>}
                <RatingMeter id={data.id + '-' + props.component} rate={data.score} />
            </div>
        </div>
    )
}

export default ReviewWidget
