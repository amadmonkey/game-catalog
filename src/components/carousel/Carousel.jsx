import React, { useState, useEffect } from 'react';
import { ReactComponent as Time, ReactComponent } from '../../img/time.svg';
import TimeAgo from 'react-timeago';
import Moment from 'react-moment';
import './Carousel.scss';

const Carousel = (props) => {

    const pauseLength = 10;
    let activeIndex = 1;
    let timeoutId = null;

    const [articles, setArticles] = useState(null);

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
                        <Moment fromNow>{obj.publish_date}</Moment>
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
