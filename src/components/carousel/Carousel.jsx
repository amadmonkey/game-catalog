import React, { useEffect } from 'react';
import { ReactComponent as Time } from '../../img/time.svg';
import Moment from 'react-moment';
import 'moment-timezone';
import './Carousel.scss';

Moment.globalTimezone = 'America/Los_Angeles';

const Carousel = (props) => {


    const pauseLength = 10;
    let activeIndex = 1;
    let timeoutId = null;

    const setTimer = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { nextItem(); }, pauseLength * 1000);
    }

    const nextItem = () => {
        let indicatorDom = document.querySelector('.indicator .active');
        let carouselItemDoms = document.querySelectorAll('.carousel-item');
        indicatorDom.style.left = (activeIndex * (indicatorDom.clientWidth + 10)) + 'px';
        carouselItemDoms.forEach((element, i) => {
            element.classList.remove('active');
        });
        carouselItemDoms[activeIndex].classList.add('active');
        activeIndex = activeIndex === 4 ? 0 : (activeIndex + 1);
        setTimer();
    }

    const CarouselItem = (obj, i) => {
        return (
            <article key={i} className={"carousel-item " + (i === 0 ? 'active' : '')}>
                <img src={obj.image.original} alt="" />
                <div className="description">
                    <h1 className="title">{obj.title}</h1>
                    <p className="summary">{obj.deck}</p>
                    <div className="date">
                        <Time className="time" />
                        <Moment tz="America/Los_Angeles" fromNow>{obj.publish_date}</Moment>
                    </div>
                </div>
            </article>
        )
    }

    const HandleClick = (i) => {
        activeIndex = i;
        nextItem();
    }

    useEffect(() => {
        document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
        });
        document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
            setTimer();
        });
        if (props.articles) {
            setTimer();
        }
    })


    return (
        <div className="carousel-container">
            {props.articles &&
                <React.Fragment>
                    {props.articles.slice(0, 5).map((value, i) => {
                        return CarouselItem(value, i)
                    })}
                    <footer className="indicator">
                        <li className="active"></li>
                        {props.articles.slice(0, 5).map((value, i) => {
                            return <li key={i} onClick={(e) => HandleClick(i)}></li>
                        })}
                    </footer>
                </React.Fragment>
            }
        </div>
    )
}

export default Carousel
