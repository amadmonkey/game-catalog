import React, { useEffect } from 'react';
import './RatingMeter.scss';

const RatingMeter = (props) => {
    const id = "_PROGRESS-" + props.id;
    const RADIUS = 54;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    function progress(value) {
        value = value === 100 ? 98 : value;
        const progress = value / 100;
        const dashoffset = CIRCUMFERENCE * (1.05 - progress);
        let progressValue = document.querySelector('#' + id + ' svg .progress__value');
        progressValue.style.strokeDashoffset = dashoffset;
    }

    const GetPosition = () => {
        const meter = document.querySelector('#' + id)
        const widget = document.querySelector('#' + id).parentElement.parentElement;
        const top = widget.getBoundingClientRect().top;
        const bottom = meter.getBoundingClientRect().bottom;
        let progressValue = document.querySelector('#' + id + ' svg .progress__value');
        let progressText = document.querySelector('#' + id + ' h1');
        if ((window.pageYOffset + 300) >= top && bottom > 0) {
            progressValue.style.strokeDasharray = CIRCUMFERENCE;
            let progressValueNumber = ((props.rate) / 10) * 100;
            let color;
            if (progressValueNumber >= 1 && progressValueNumber <= 59) {
                color = '#ff2c2c';
            } else if (progressValueNumber >= 60 && progressValueNumber <= 79) {
                color = '#ffa500';
            } else if (progressValueNumber >= 80 && progressValueNumber <= 100) {
                color = '#1bad1b';
            }
            progressValue.style.stroke = color;
            progressText.style.color = color;
            progress((props.rate / 10) * 100);
        } else {
            progressValue.style.stroke = "transparent";
            progressText.style.color = "transparent";
            progress(0);
        }
    }

    useEffect(() => {
        GetPosition();
        window.addEventListener("scroll", GetPosition);
        return function cleanup() {
            window.removeEventListener("scroll", GetPosition);
        }
    })

    return (
        <div id={id} className="meter">
            <h1>{props.rate}</h1>
            <svg className="progress" width="120" height="160" viewBox="0 0 120 120">
                <circle className="progress__meter" cx="60" cy="60" r="50" strokeWidth="10" />
                <circle className="progress__value" cx="60" cy="60" r="50" strokeWidth="10" />
            </svg>
        </div>
    )
}

export default RatingMeter
