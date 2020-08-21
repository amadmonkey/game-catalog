import React, { useEffect } from 'react';
import './RatingMeter.scss';

const RatingMeter = (props) => {
    const id = "_PROGRESS-" + props.id;
    const RADIUS = 54;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    function progress(value) {
        const progress = value / 100;
        const dashoffset = CIRCUMFERENCE * (1.05 - progress);
        console.log(dashoffset);
        let progressValue = document.querySelector('#' + id + ' svg .progress__value');
        progressValue.style.strokeDashoffset = dashoffset;
    }

    useEffect(() => {
        GetPosition();
    })

    const GetPosition = () => {
        const dom = document.querySelector('#' + id);
        const top = dom.getBoundingClientRect().top + dom.clientWidth;
        let progressValue = document.querySelector('#' + id + ' svg .progress__value');
        let progressText = document.querySelector('#' + id + ' h1');
        if (window.pageYOffset >= top) {
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

    document.addEventListener('scroll', (e) => {
        GetPosition();
    });

    return (
        <div id={id} className="meter">
            <h1>{props.rate}</h1>
            <svg className="progress" width="120" height="160" viewBox="0 0 120 120">
                <circle className="progress__meter" cx="60" cy="60" r="50" strokeWidth="15" />
                <circle className="progress__value" cx="60" cy="60" r="50" strokeWidth="15" />
            </svg>
        </div>
    )
}

export default RatingMeter
